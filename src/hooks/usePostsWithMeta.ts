import { PostResult, Result } from '@api-response';
import { getErrorMessage } from '@utils/convert-utils';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

type ApiResponse = PostResult.GetIndex;
type FetcherError = AxiosError<ApiResponse>;
type UsePostsData = ApiResponse['data'];

const fetcher = (endpoint: string, categorySlug: string) =>
	axios
		.get<ApiResponse>(endpoint, {
			params: {
				categorySlug,
			},
		})
		.then((res) => res.data.data);
export const usePostsWithMeta = (
	categorySlug: string,
	initialData?: UsePostsData | null
): Result<UsePostsData> => {
	const { data, error, revalidate } = useSWR<UsePostsData, FetcherError>(
		['/api/posts', categorySlug],
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

	return {
		data,
		error: null,
	};
};
