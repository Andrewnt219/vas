import { PostResult, Result } from '@api-response';
import { PostModel } from '@lib/sanity/models/PostModel';
import { getErrorMessage } from '@utils/convert-utils';
import axios, { AxiosError } from 'axios';
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
	initialData?: PostModel[]
): Result<PostModel[]> => {
	const { data, error, revalidate } = useSWR<
		PostModel[] | null,
		AxiosError<PostResult.GetRelatedPost>
	>(['/api/posts/relatedPosts', postSlug], fetcher, { initialData });

	useEffect(() => {
		revalidate();
	}, [revalidate]);

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
