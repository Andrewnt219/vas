import { PostResponse, Response } from '@api-response';
import { PostWihMeta } from '@common';
import { PostModel } from '@lib/sanity/models/PostModel';
import { getErrorMessage } from '@utils/convert-utils';
import axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { useIncreaseView } from './useIncreaseView';
import { useRelatedPosts } from './useRelatedPosts';

type UsePostData = { post: PostWihMeta; relatedPosts: PostModel[] };
type ApiResponse = PostResponse.GetSlug;
type FetcherError = AxiosError<ApiResponse>;

const postFetcher = (endpoint: string) =>
	axios.get<ApiResponse>(endpoint).then((res) => res.data.data);

export const usePost = (
	postSlug: string | undefined,
	initialData?: UsePostData | null
): Response<UsePostData> => {
	const views = useIncreaseView(postSlug);

	const { data: relatedPosts, error: relatedPostError } = useRelatedPosts(
		initialData?.post.slug,
		initialData?.relatedPosts
	);

	const { data: postData, error: postError } = useSWR<
		UsePostData['post'] | null,
		FetcherError
	>(postSlug ? `/api/posts/${postSlug}` : null, postFetcher, {
		initialData: initialData?.post,
	});

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

	if (!postData || !views || !relatedPosts) {
		return {
			data: null,
			error: null,
		};
	}

	return {
		data: { post: { ...postData, views }, relatedPosts },
		error: null,
	};
};
