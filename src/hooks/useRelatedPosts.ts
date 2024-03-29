import { Result } from '@common';
import { PostsGetRelatedPosts } from '@src/pages/api/posts/relatedPosts';
import { getErrorMessage } from '@utils/convert-utils';
import {
  createResult,
  createResultError,
  createResultPending,
} from '@utils/create-utils';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR, { ConfigInterface } from 'swr';

const fetcher = (endpoint: string) =>
  axios.get<PostsGetRelatedPosts>(endpoint).then((res) => res.data.data);

/* -------------------------------------------------------------------------- */
type SWRdata = PostsGetRelatedPosts['data'];
type SWRerror = AxiosError<PostsGetRelatedPosts>;
export const useRelatedPost = (
  postID: string | undefined,
  config?: ConfigInterface<SWRdata, SWRerror>
): Result<SWRdata> => {
  const { locale, isPreview } = useRouter();

  const shouldSendRequest = !isPreview && postID !== undefined;
  const swrKey = shouldSendRequest
    ? `/api/posts/relatedPosts?postID=${postID}`
    : null;
  const { data, error, revalidate } = useSWR(swrKey, fetcher, config);

  useEffect(() => {
    revalidate();
  }, [revalidate, locale]);

  if (error) {
    return createResultError(getErrorMessage(error), config?.initialData);
  }

  if (isPreview || !data) {
    return createResultPending(config?.initialData);
  }

  return createResult(data);
};
