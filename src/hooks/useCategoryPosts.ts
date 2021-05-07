import { Result } from '@common';
import { PostsGetIndex } from '@src/pages/api/posts';
import { getErrorMessage } from '@utils/convert-utils';
import {
  createResult,
  createResultError,
  createResultPending,
} from '@utils/create-utils';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR, { keyInterface } from 'swr';

type ApiResponse = PostsGetIndex;
type FetcherError = AxiosError<ApiResponse>;
type UsePostsData = ApiResponse['data'];

const fetcher = (endpoint: string) =>
  axios.get<ApiResponse>(endpoint).then((res) => res.data.data);
export const useCategoryPosts = (
  categoryUID: string | undefined,
  page: number,
  initialData?: UsePostsData | null
): Result<UsePostsData> => {
  const swrKey: keyInterface = `/api/posts?categoryUID=${categoryUID}&page=${page}`;

  const { data, error, revalidate } = useSWR<UsePostsData, FetcherError>(
    swrKey,
    fetcher,
    {
      initialData,
    }
  );

  const { locale, isPreview } = useRouter();

  useEffect(() => {
    revalidate();
  }, [revalidate, locale]);

  if (error) {
    return createResultError(getErrorMessage(error));
  }

  if (isPreview) {
    return createResultPending(initialData);
  }

  if (!data) {
    return createResultPending();
  }

  return createResult(data);
};
