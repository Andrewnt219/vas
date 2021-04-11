import { Result } from '@common';
import { RelatedPostsResult } from '@services/post-service';
import { PostsGetRelatedPosts } from '@src/pages/api/posts/relatedPosts';
import { getErrorMessage } from '@utils/convert-utils';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (endpoint: string, postUID: string) =>
	axios
		.get<PostsGetRelatedPosts>(endpoint, {
			params: {
				postUID,
			},
		})
		.then((res) => res.data.data);

type SWRdata = RelatedPostsResult | null;
type SWRerror = AxiosError<PostsGetRelatedPosts>;
export const useRelatedPosts = (
	postUID: string | undefined,
	initialData?: RelatedPostsResult | null
): Result<RelatedPostsResult> => {
	const swrKey = ['/api/posts/relatedPosts', postUID];
	const { data, error, revalidate } = useSWR<SWRdata, SWRerror>(
		swrKey,
		fetcher,
		{
			initialData,
		}
	);

	const { locale } = useRouter();

	useEffect(() => {
		revalidate();
	}, [revalidate, locale]);

	if (error) {
		return {
			data: null,
			error: { message: getErrorMessage(error) },
		};
	}

	if (!data) {
		return {
			data: null,
			error: null,
		};
	}

	return { data, error: null };
};
