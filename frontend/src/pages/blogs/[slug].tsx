import MainLayout from '@src/components/MainLayout/MainLayout';
import { MdxComponents } from '@src/components/MdxComponents';
import { mdx } from '@src/lib/mdx';
import { PostModel } from '@src/models/PostModel';
import { PostDataService } from '@src/services/post-data-service';
import { SanityDataService } from '@src/services/sanity-data-service';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import hydrate from 'next-mdx-remote/hydrate';
import { MdxRemote } from 'next-mdx-remote/types';
import React, { VFC } from 'react';
import useSWR from 'swr';

type StaticProps = {
	source: MdxRemote.Source | null;
	post: PostModel | null;
	views: number;
	error?: Error | null;
};

type Params = { slug: string };

export const getStaticProps: GetStaticProps<StaticProps, Params> = async ({
	params,
}) => {
	const returnProps: StaticProps = {
		source: null,
		views: 0,
		post: null,
		error: null,
	};

	if (!params?.slug) {
		return {
			props: {
				...returnProps,
				error: { message: 'Param slug not found', name: 'GetStaticProps' },
			},
		};
	}

	const post = await SanityDataService.getPostBySlug(params.slug);

	if (!post) {
		return {
			props: {
				...returnProps,
				error: { message: 'Post not found', name: 'GetStaticProps' },
			},
		};
	}

	const source = await mdx.parse(post.content);

	const views = await PostDataService.increaseViews(post._id);

	return {
		props: { source, post, views: views ?? 0 },
		revalidate: 60,
	};
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const slugs = await SanityDataService.getPostSlugs();

	const paths = slugs.map(({ slug }) => ({ params: { slug } }));

	return {
		paths,
		fallback: true,
	};
};

const fetcher = (slug: string) => {
	return SanityDataService.getPostBySlug(slug);
};

type Props = InferGetStaticPropsType<typeof getStaticProps> & {};

const Post: VFC<Props> = ({ source, views, post, error }) => {
	const { data, error: swrError } = useSWR([post?.slug], fetcher, {
		initialData: post,
	});

	if (error || swrError || !post || !source) {
		return <h1>Fail to fetch content</h1>;
	}

	if (!data) {
		return <h1>Loading</h1>;
	}

	const content = hydrate(source, { components: MdxComponents });

	return (
		<MainLayout>
			<h1>
				{post.title} {views} views
			</h1>
			{content}
		</MainLayout>
	);
};

export default Post;
