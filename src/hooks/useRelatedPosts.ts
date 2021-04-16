import { Result } from '@common';
import { PostsGetRelatedPosts } from '@src/pages/api/posts/relatedPosts';
import { getErrorMessage } from '@utils/convert-utils';
import { createResultError, createResultPending } from '@utils/create-utils';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR, { ConfigInterface } from 'swr';

const fetcher = (endpoint: string, postID: string) =>
	axios
		.get<PostsGetRelatedPosts>(endpoint, {
			params: {
				postID,
			},
		})
		.then((res) => res.data.data);

/* -------------------------------------------------------------------------- */
type SWRdata = PostsGetRelatedPosts['data'];
type SWRerror = AxiosError<PostsGetRelatedPosts>;
export const useRelatedPost = (
	postID: string | undefined,
	config?: ConfigInterface<SWRdata, SWRerror>
): Result<SWRdata> => {
	const swrKey = ['/api/posts/relatedPosts', postID];
	const { data, error, revalidate } = useSWR(swrKey, fetcher, config);

	const { locale, isPreview } = useRouter();

	useEffect(() => {
		revalidate();
	}, [revalidate, locale]);

	if (error) {
		return createResultError(getErrorMessage(error), config?.initialData);
	}

	if (isPreview || !data) {
		return createResultPending(config?.initialData);
	}

	return { data, error: null };
};
