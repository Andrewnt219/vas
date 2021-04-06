import { Result } from '@api-response';
import Post from '@components/Post/Post';
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
import dayjs from 'dayjs';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import NextLink from 'next/link';
import { RichText } from 'prismic-reactjs';
import React from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

function PostUid({ data: postDoc, error, preview }: Props) {
	if (error) {
		return <h1>Something went wrong</h1>;
	}

	if (!postDoc) {
		return <h2>Loading</h2>;
	}

	const displayedHashtag = postDoc.data.hashtags?.[0].hashtag;
	const { data: postData } = postDoc;

	return (
		<MainLayout title={RichText.asText(postData.title)} isPreviewMode={preview}>
			<section tw="col-span-full leading-relaxed! md:text-lg xl:text-xl">
				<Post.Wrapper as="header">
					{displayedHashtag && (
						<NextLink href={`/hashtags/${displayedHashtag.uid}`} passHref>
							<a tw="block transition-colors text-primary underline decorator-transparent hocus:(decorator-primary) xl:(font-bold text-primary)">
								{RichText.asText(displayedHashtag.data.title)}
							</a>
						</NextLink>
					)}

					<Post.Title tw="my-2 md:my-5">
						{RichText.asText(postData.title)}
					</Post.Title>

					<time
						tw="text-gray-200 text-smaller italic"
						dateTime={dayjs(postDoc.last_publication_date ?? Date.now()).format(
							'YYYY-MM-DD'
						)}
					>
						{dayjs(postDoc.last_publication_date ?? Date.now()).format(
							'MMMM DD, YYYY'
						)}
					</time>
				</Post.Wrapper>

				<Post.Wrapper tw="mt-10 md:mt-14 xl:mt-20">
					{postData.body.map((slice, index) => (
						<SliceZone slice={slice} key={`slice-${index}`} />
					))}
				</Post.Wrapper>
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
export default PostUid;
