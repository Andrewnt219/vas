import { Result } from '@common';
import { PrismicResult } from '@lib/prismic/prismic-service';
import { Post, PostService } from '@services/post-service';
import { apiHanler, getLocaleCookie } from '@src/server/utils/api-utils';
import { createResult, createResultError } from '@utils/create-utils';
import { NextApiHandler } from 'next';

export type PostsGetRelatedPosts = Result<PrismicResult<Post>>;

const get: NextApiHandler<PostsGetRelatedPosts> = async (req, res) => {
  const { postID } = req.query;
  const lang = getLocaleCookie(req);

  if (!postID || typeof postID !== 'string') {
    return res
      .status(400)
      .json(createResultError('Missing or invalid post uid'));
  }

  const relatedPosts = await PostService.getRelatedPosts(postID, lang);

  return res.status(200).json(createResult(relatedPosts));
};

export default apiHanler({ get });
