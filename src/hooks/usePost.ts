import { Result } from '@common';
import { PostsUIDget } from '@src/pages/api/posts/[uid]';
import { Post } from '@src/server/services/post-service';
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
import { useIncreaseView } from './useIncreaseView';

const fetcher = (endpoint: string, postID: string) =>
  axios
    .get<PostsUIDget>(endpoint, {
      params: {
        id: postID,
      },
    })
    .then((res) => res.data.data);
/* -------------------------------------------------------------------------- */

type SWRdata = PostsUIDget['data'];
type SWRerror = AxiosError<PostsUIDget>;
type Parameters = {
  post: Post | undefined;
  config?: ConfigInterface<SWRdata, SWRerror>;
};
export const usePost = ({ post, config }: Parameters): Result<SWRdata> => {
  const postID = post?.id;
  const postUID = post?.uid;

  const { locale, isPreview } = useRouter();

  const swrKey = isPreview ? null : `/api/posts/${postUID}`;
  const { data, error, revalidate } = useSWR(swrKey, fetcher, {
    initialData: post,
    ...config,
  });

  useEffect(() => {
    revalidate();
  }, [revalidate, locale]);

  useIncreaseView(postID);

  if (error) {
    return createResultError(getErrorMessage(error));
  }

  if (!data) {
    return createResultPending(post);
  }

  return createResult(data);
};
