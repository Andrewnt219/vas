import { Result } from '@common';
import { Post } from '@services/post-service';
import { PostsUIDget } from '@src/pages/api/posts/[uid]';
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
	isPreviewMode: boolean;
};
export const usePost = ({
	post,
	config,
	isPreviewMode = false,
}: Parameters): Result<SWRdata> => {
	const postID = post?.id;
	const postUID = post?.uid;

	const swrKey = `/api/posts/${postUID}`;
	const { data, error, revalidate } = useSWR(swrKey, fetcher, {
		initialData: post,
		...config,
	});

	const { locale } = useRouter();

	useEffect(() => {
		revalidate();
	}, [revalidate, locale]);

	useIncreaseView(postID);

	if (error) {
		return createResultError(getErrorMessage(error));
	}

	if (isPreviewMode || !data) {
		return createResultPending(post);
	}

	return createResult(data);
};
