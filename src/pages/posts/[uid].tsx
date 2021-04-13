import { Result } from '@common';
import { PreviewProvider } from '@contexts/PreviewContext';
import MainLayout from '@layouts/MainLayout';
import PostWithoutHero from '@layouts/PostWithoutHero';
import { Post, PostService } from '@services/post-service';
import { useCurrentLocation } from '@src/hooks/useCurrentLocation';
import { usePost } from '@src/hooks/usePost';
import { useRelatedPost } from '@src/hooks/useRelatedPosts';
import {
	createStaticError,
	createStaticProps,
	errorStatcPropsHandler,
	errorStaticPathsHandler,
} from '@src/server/utils/page-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { RichText } from 'prismic-reactjs';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function PostUid({ data: initialData, error: serverError, preview }: Props) {
	const location = useCurrentLocation();

	const { data: post, error: postError } = usePost({
		post: initialData?.main,
		isPreviewMode: preview,
	});

	const { data: relatedPosts, error: relatedPostsError } = useRelatedPost(
		initialData?.main.id,
		{
			initialData: initialData?.relatedPosts,
		},
		preview
	);

	// server error is prioritized, so place first
	if (serverError || postError || relatedPostsError) {
		return (
			<h1>
				{serverError?.message ??
					postError?.message ??
					relatedPostsError?.message}
			</h1>
		);
	}

	if (!post || !relatedPosts) {
		return <h2>Loading</h2>;
	}

	const categoryUID = post.data.categories?.[0].category.uid;
	let renderedPostPage = <h1>Fail to get post</h1>;

	switch (categoryUID) {
		case 'blog':
		case 'news':
			renderedPostPage = (
				<PostWithoutHero post={post} relatedPosts={relatedPosts} />
			);
			break;

		case 'event':
		case 'orientation':
		case 'tet':
			renderedPostPage = (
				<PostWithoutHero post={post} relatedPosts={relatedPosts} />
			);
			break;

		default:
			break;
	}

	const ogImgUrl = `${post.data.thumbnail.url}&fm=jpg&w=1500`;

	return (
		<PreviewProvider initialValue={preview}>
			<MainLayout
				title={post.data.title}
				tw="pb-0! leading-relaxed! md:text-xl"
			>
				<Head>
					<meta property="og:url" content={location} />
					<meta property="og:type" content="article" />
					<meta property="og:title" content={post.data.title} />
					<meta
						property="og:description"
						content={RichText.asText(post.data.snippet)}
					/>
					<meta property="og:image" content={ogImgUrl} />
					<meta
						property="og:image:width"
						content={post.data.thumbnail.dimensions.width.toString()}
					/>
					<meta
						property="og:image:height"
						content={post.data.thumbnail.dimensions.height.toString()}
					/>

					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:title" content={post.data.title} />
					<meta
						name="twitter:description"
						content={RichText.asText(post.data.snippet)}
					/>
					<meta name="twitter:image" content={ogImgUrl} />

					<meta
						property="article:published_time"
						content={
							post.first_publication_date
								? new Date(post.first_publication_date).toISOString()
								: new Date().toISOString()
						}
					/>
				</Head>

				{renderedPostPage}
			</MainLayout>
		</PreviewProvider>
	);
}
type StaticProps = Result<{ main: Post; relatedPosts: Post[] }> & {
	preview: boolean;
};

type Params = {
	uid: string;
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
	params,
	locale,
	preview = false,
	previewData = {},
}) => {
	try {
		const { ref } = previewData;
		const lang = tryParseLocale(locale);
		const uid = params?.uid;

		if (!uid) {
			return createStaticError('Missing uid', preview);
		}

		const post = await PostService.getPostByUID(uid, lang, ref);

		if (!post) {
			return createStaticError('Post not found', preview);
		}

		const relatedPosts = await PostService.getRelatedPosts(post.id, lang, ref);

		const data = {
			main: post,
			relatedPosts,
		};

		return createStaticProps(data, preview);
	} catch (error) {
		return errorStatcPropsHandler(error);
	}
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	try {
		const posts = await PostService.getPosts('*');

		const paths = posts.map((post) => ({
			params: { uid: post.uid ?? '' },
			locale: post.lang,
		}));

		return {
			paths,
			fallback: true,
		};
	} catch (error) {
		return errorStaticPathsHandler(error);
	}
};
export default PostUid;
