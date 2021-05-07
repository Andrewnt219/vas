import { Result } from '@common';
import { MAX_PAGE_SIZE } from '@data/range-data';
import { PrismicResult } from '@lib/prismic/prismic-service';
import { Post, PostService } from '@services/post-service';
import { apiHanler, getLocaleCookie } from '@src/server/utils/api-utils';
import { createResult, createResultError } from '@utils/create-utils';
import { NextApiRequest, NextApiResponse } from 'next';

export type PostsGetIndex = Result<PrismicResult<Post>>;
async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse<PostsGetIndex>
) {
  const { categoryUID, page = 1, pageSize = MAX_PAGE_SIZE } = req.query;
  const lang = getLocaleCookie(req);
  const queryOptions = { pageSize, page };

  let postsResult: PrismicResult<Post> | null = null;

  if (categoryUID && !Array.isArray(categoryUID)) {
    postsResult = await PostService.getPostsByCategoryUID(
      categoryUID,
      lang,
      queryOptions
    );
  } else {
    postsResult = await PostService.getPosts(lang, queryOptions);
  }

  if (!postsResult) {
    return res
      .status(404)
      .json(createResultError('Cannot find matching posts'));
  }

  return res.status(200).json(createResult(postsResult));
}

export default apiHanler({ get: getHandler });
