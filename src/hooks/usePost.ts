import { PostResult, Result } from '@api-response';
import { PostWihMeta } from '@common';
import { PostModel } from '@lib/sanity/models/PostModel';
import { getErrorMessage } from '@utils/convert-utils';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useIncreaseView } from './useIncreaseView';
import { useRelatedPosts } from './useRelatedPosts';

type UsePostData = { post: PostWihMeta; relatedPosts: PostModel[] };
type ApiResponse = PostResult.GetSlug;
type FetcherError = AxiosError<ApiResponse>;

const postFetcher = (endpoint: string) =>
	axios.get<ApiResponse>(endpoint).then((res) => res.data.data);

export const usePost = (
	postSlug: string | undefined,
	initialData?: UsePostData | null
): Result<UsePostData> => {
	const views = useIncreaseView(postSlug);

	const { data: relatedPosts, error: relatedPostError } = useRelatedPosts(
		initialData?.post.slug,
		initialData?.relatedPosts
	);

	const { data: postData, error: postError, revalidate } = useSWR<
		UsePostData['post'] | null,
		FetcherError
	>(postSlug ? `/api/posts/${postSlug}` : null, postFetcher, {
		initialData: initialData?.post,
	});

	const { locale, asPath } = useRouter();

	useEffect(() => {
		revalidate();
	}, [revalidate, locale]);

	if (relatedPostError) {
		return {
			data: null,
			error: relatedPostError,
		};
	}

	if (postError) {
		return {
			data: null,
			error: { message: getErrorMessage(postError) },
		};
	}

	if (!postData || !relatedPosts) {
		return {
			data: null,
			error: null,
		};
	}

	if (!views) {
		return {
			data: { post: postData, relatedPosts: relatedPosts },
			error: null,
		};
	}

	return {
		data: { post: { ...postData, views }, relatedPosts },
		error: null,
	};
};
