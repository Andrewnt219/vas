import { Result } from '@common';
import { PostMeta } from '@lib/firestore/models/FsPostDoc';
import { PostService } from '@src/server/services/post-service';
import { apiHanler } from '@src/server/utils/api-utils';
import { createResult, createResultError } from '@utils/create-utils';
import { NextApiRequest, NextApiResponse } from 'next';

export type PatchPostsIncreaseView = Result<PostMeta>;

async function patchHandler(
  req: NextApiRequest,
  res: NextApiResponse<PatchPostsIncreaseView>
) {
  const { id } = req.body;

  if (!id || typeof id !== 'string') {
    return res
      .status(400)
      .json(createResultError('Missing or invalid post id'));
  }

  const postMeta = await PostService.increaseViews(id);

  if (!postMeta) {
    return res.status(404).json(createResultError('Post not found'));
  }

  return res.status(200).json(createResult(postMeta));
}

export default apiHanler({ patch: patchHandler });
