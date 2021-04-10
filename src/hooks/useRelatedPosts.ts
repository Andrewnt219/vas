import { PostResult, Result } from '@api-response';
import { RelatedPostsResult } from '@services/post-service';
import { getErrorMessage } from '@utils/convert-utils';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const fetcher = (endpoint: string, postSlug: string) =>
	axios
		.get<PostResult.GetRelatedPost>(endpoint, {
			params: {
				postSlug,
			},
		})
		.then((res) => res.data.data);

export const useRelatedPosts = (
	postSlug: string | undefined,
	initialData?: RelatedPostsResult
): Result<RelatedPostsResult> => {
	const { data, error, revalidate } = useSWR<
		RelatedPostsResult | null,
		AxiosError<PostResult.GetRelatedPost>
	>(['/api/posts/relatedPosts', postSlug], fetcher, { initialData });

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
