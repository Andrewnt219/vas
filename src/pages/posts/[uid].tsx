import { Result } from '@api-response';
import PostWithoutHero from '@layouts/PostWithoutHero';
import { Post } from '@model';
import { PostService } from '@services/post-service';
import {
	errorStatcPropsHandler,
	errorStaticPathsHandler,
} from '@src/server/utils/page-utils';
import { tryParseLocale } from '@utils/validate-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function PostUid({ data, error, preview, meta }: Props) {
	if (error) {
		return <h1>{error.message}</h1>;
	}

	if (!data) {
		return <h2>Loading</h2>;
	}

	const categoryUID = data.post.data.categories?.[0].category.uid;
	switch (categoryUID) {
		case 'blog':
		case 'news':
			return (
				<PostWithoutHero
					post={data.post}
					relatedPosts={data.relatedPosts}
					isPreviewMode={preview}
				/>
			);

		case 'events':
		case 'orientation':
		case 'tet':
			return (
				<PostWithoutHero
					isPreviewMode={preview}
					post={data.post}
					relatedPosts={data.relatedPosts}
				/>
			);

		default:
			return <h1>Fail to get post</h1>;
	}
}
type StaticProps = Result<{ post: Post; relatedPosts: Post[] }> & {
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
					post: main,
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
