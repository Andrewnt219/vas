import { Result } from '@common';
import { PostsGetIndex } from '@src/pages/api/posts';
import { getErrorMessage } from '@utils/convert-utils';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR, { keyInterface } from 'swr';

type ApiResponse = PostsGetIndex;
type FetcherError = AxiosError<ApiResponse>;
type UsePostsData = ApiResponse['data'];

const fetcher = (endpoint: string, categoryUID: string) =>
	axios
		.get<ApiResponse>(endpoint, {
			params: {
				categoryUID,
			},
		})
		.then((res) => res.data.data);
export const useCategoryPosts = (
	categoryUID: string | undefined,
	initialData?: UsePostsData | null
): Result<UsePostsData> => {
	const swrKey: keyInterface = ['/api/posts', categoryUID];
	const { data, error, revalidate } = useSWR<UsePostsData, FetcherError>(
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

	return {
		data,
		error: null,
	};
};
