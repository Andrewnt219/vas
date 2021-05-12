import { Result, ResultSuccess } from '@common';
import { PostComment } from '@lib/firestore/models/FsPostDoc';
import { PostService } from '@src/server/services/post-service';
import { apiHanler } from '@src/server/utils/api-utils';
import { createResult, createResultError } from '@utils/create-utils';
import { NextApiRequest, NextApiResponse } from 'next';

type PatchData = PostComment;
export type PatchPostsCommentResult = ResultSuccess<PatchData>;
const patch = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<PatchData>>
) => {
  const comment: PostComment = req.body;

  const postComment = await PostService.insertComment(comment);
  if (!postComment) {
    return res.status(404).json(createResultError('Comment not found'));
  }

  return res.status(201).json(createResult(postComment));
};

type GetData = PostComment[];
export type GetPostsCommentResult = ResultSuccess<GetData>;
const get = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<GetData>>
) => {
  const { postUID } = req.query;

  if (!postUID || Array.isArray(postUID)) {
    return res
      .status(400)
      .json(createResultError('Missing or invalid postUID'));
  }

  const postComments = await PostService.getCommentsByPostUid(postUID);

  return res.status(200).json(createResult(postComments));
};

export default apiHanler({ get, patch });
