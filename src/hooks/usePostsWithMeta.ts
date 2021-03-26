import { PostResult, Result } from '@api-response';
import { CategorySlug } from '@lib/sanity/models/CategoryModel';
import { getErrorMessage } from '@utils/convert-utils';
import axios, { AxiosError } from 'axios';
import useSWR from 'swr';

type ApiResponse = PostResult.GetIndex;
type FetcherError = AxiosError<ApiResponse>;
type UsePostsData = ApiResponse['data'];

const fetcher = (endpoint: string, categorySlug: CategorySlug) =>
	axios
		.get<ApiResponse>(endpoint, {
			params: {
				categorySlug,
			},
		})
		.then((res) => res.data.data);
export const usePostsWithMeta = (
	categorySlug: CategorySlug,
	initialData?: UsePostsData | null
): Result<UsePostsData> => {
	const { data, error } = useSWR<UsePostsData, FetcherError>(
		['/api/posts', categorySlug],
		fetcher,
		{
			initialData,
		}
	);

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

	return {
		data,
		error: null,
	};
};
