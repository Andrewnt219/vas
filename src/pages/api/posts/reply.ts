import { Result, ResultSuccess } from '@common';
import { PostComment, PostReply } from '@lib/firestore/models/FsPostDoc';
import { PostService } from '@src/server/services/post-service';
import { apiHanler } from '@src/server/utils/api-utils';
import { createResult, createResultError } from '@utils/create-utils';
import { NextApiRequest, NextApiResponse } from 'next';

type PatchData = PostComment;
export type PatchPostsCommentReplyResult = ResultSuccess<PatchData>;
const patch = async (
  req: NextApiRequest,
  res: NextApiResponse<Result<PatchData>>
) => {
  const reply: PostReply = req.body;
  const { commentId } = req.query;

  if (!commentId || Array.isArray(commentId)) {
    return res
      .status(400)
      .json(createResultError('Missing or invalid comment id'));
  }

  const postComment = await PostService.insertReply(commentId, reply);
  if (!postComment) {
    return res.status(404).json(createResultError('Comment not found'));
  }

  return res.status(201).json(createResult(postComment));
};

export default apiHanler({ patch });
