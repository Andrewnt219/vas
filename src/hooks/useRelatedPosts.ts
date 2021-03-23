import { RelatedPostResponse, Response } from '@api-response';
import { PostModel } from '@lib/sanity/models/PostModel';
import { toError } from '@utils/convert-utils';
import axios, { AxiosError } from 'axios';
import useSWR from 'swr';

const fetcher = (endpoint: string, categorySlug: string) =>
	axios
		.get<RelatedPostResponse>(endpoint, {
			params: {
				categorySlug,
			},
		})
		.then((res) => res.data.data);

export const useRelatedPosts = (
	categorySlug: string | undefined,
	initialData?: PostModel[]
): Response<PostModel[]> => {
	const { data, error } = useSWR<
		PostModel[] | null,
		AxiosError<RelatedPostResponse>
	>(['/api/posts/relatedPosts', categorySlug], fetcher, { initialData });

	if (error) {
		return {
			data: null,
			error: toError(error),
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
