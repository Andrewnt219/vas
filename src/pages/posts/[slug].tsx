import { Response } from '@api-response';
import { PostModel } from '@lib/sanity/PostModel';
import { PostDataService } from '@services/post-data-service';
import { assertLanguages } from '@src/utils/validate-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import React, { VFC } from 'react';
import 'twin.macro';

type StaticProps = Response<PostModel>;

type Params = {
	slug: string;
};

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
	params,
	locale,
}) => {
	assertLanguages(locale);

	PostDataService.switchLanguage(locale);

	if (!params?.slug) {
		return {
			props: {
				data: null,
				error: { message: 'Missing slug' },
			},
		};
	}

	const post = await PostDataService.getPostBySlug(params.slug);

	if (!post) {
		return {
			props: {
				data: null,
				error: { message: 'Post not found' },
			},
		};
	}

	return {
		props: {
			data: post,
			error: null,
		},
		revalidate: 60,
	};
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const slugs = await PostDataService.getPostSlugs();

	const paths = slugs.map(({ slug }) => ({ params: { slug } }));

	return {
		paths,
		fallback: true,
	};
};
type Props = InferGetStaticPropsType<typeof getStaticProps> & {
	className?: string;
};

const Post: VFC<Props> = ({ className, data, error }) => {
	if (error) {
		return <h1>{error.message}</h1>;
	}

	if (!data) {
		return <h1>Fetching post...</h1>;
	}

	return (
		<div className={className} tw="">
			{data.title + data._lang}
		</div>
	);
};

export default Post;
