import { Result } from '@api-response';
import MainLayout from '@layouts/MainLayout';
import SliceZone from '@lib/prismic/components/slices/SliceZone/SliceZone';
import {
	PostDocument,
	PostModel,
	postQuery,
} from '@lib/prismic/models/PostModel';
import { Document } from '@prismic-types';
import Prismic from '@prismicio/client';
import { PMclient } from '@root/prismic-configuration';
import { isString, tryParseLocale } from '@utils/validate-utils';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import 'twin.macro';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function Post({ data, error, preview }: Props) {
	if (error) {
		return <h1>Something went wrong</h1>;
	}

	if (!data) {
		return <h2>Loading</h2>;
	}

	return (
		<MainLayout
			title={RichText.asText(data.data.title)}
			isPreviewMode={preview}
		>
			<section tw="col-span-full">
				<header>
					<h2>{RichText.asText(data.data.title)}</h2>
				</header>

				{data.data.body.map((slice, index) => (
					<SliceZone slice={slice} key={`slice-${index}`} />
				))}
			</section>
		</MainLayout>
	);
}

type StaticProps = Result<Document<PostModel>> & {
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

	const post = (await PMclient.getByUID('post', uid, {
		graphQuery: postQuery,
		lang: tryParseLocale(locale),
		ref,
	})) as Document<PostModel>;

	if (!post) {
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
			data: post,
			error: null,
			preview: preview,
		},
		revalidate: 60,
	};
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const response = await PMclient.query(
		Prismic.Predicates.at('document.type', 'post'),
		{ graphQuery: postQuery }
	);

	const uids = response.results
		.map((result: PostDocument) => result.uid)
		.filter(isString);
	const paths = uids.map((uid) => ({ params: { uid } }));

	return {
		paths,
		fallback: true,
	};
};
export default Post;
