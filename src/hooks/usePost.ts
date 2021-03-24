import { PostResponse, Response } from '@api-response';
import { PostWihMeta } from '@common';
import { PostModel } from '@lib/sanity/models/PostModel';
import { toError } from '@utils/convert-utils';
import axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { useIncreaseView } from './useIncreaseView';
import { useRelatedPosts } from './useRelatedPosts';

const postFetcher = (endpoint: string) =>
	axios.get<PostResponse.GetSlug>(endpoint).then((res) => res.data.data);

type UsePostData = { post: PostWihMeta; relatedPosts: PostModel[] };

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
		PostWihMeta | null,
		AxiosError<PostResponse.GetRelatedPost>
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
			error: toError(postError),
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
