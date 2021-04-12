import { Result } from '@common';
import { PreviewProvider } from '@contexts/PreviewContext';
import MainLayout from '@layouts/MainLayout';
import PostWithoutHero from '@layouts/PostWithoutHero';
import { Post, PostService } from '@services/post-service';
import { useRelatedPosts } from '@src/hooks/useRelatedPosts';
import {
	errorStatcPropsHandler,
	errorStaticPathsHandler,
} from '@src/server/utils/page-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function PostUid({ data: initialData, error: serverError, preview }: Props) {
	const { data, error } = useRelatedPosts(
		initialData?.main.uid,
		initialData,
		preview
	);

	if (error || serverError) {
		return <h1>{serverError?.message ?? error?.message}</h1>;
	}

	if (!data || !data.main) {
		return <h2>Loading</h2>;
	}

	const categoryUID = data.main.data.categories?.[0].category.uid;
	let renderedPostPage = <h1>Fail to get post</h1>;

	switch (categoryUID) {
		case 'blog':
		case 'news':
			renderedPostPage = (
				<PostWithoutHero post={data.main} relatedPosts={data.relatedPosts} />
			);
			break;

		case 'event':
		case 'orientation':
		case 'tet':
			renderedPostPage = (
				<PostWithoutHero post={data.main} relatedPosts={data.relatedPosts} />
			);
			break;

		default:
			break;
	}

	return (
		<PreviewProvider initialValue={preview}>
			<MainLayout
				title={data.main.data.title}
				tw="pb-0! leading-relaxed! md:text-xl"
			>
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

		const uid = params?.uid;

		if (!uid) {
			return {
				props: {
					data: null,
					error: {
						message: 'Missing uid',
					},
					preview,
				},
			};
		}

		const { main, relatedPosts } = await PostService.getRelatedPosts(
			uid,
			tryParseLocale(locale),
			ref
		);

		if (!main) {
			return {
				props: {
					data: null,
					error: { message: 'Post not found' },
					preview: preview,
				},
			};
		}

		return {
			props: {
				data: {
					main: main,
					relatedPosts,
				},
				error: null,
				preview,
			},
			revalidate: 60,
		};
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
