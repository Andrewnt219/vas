import { Result } from '@common';
import { MAX_PAGE_SIZE } from '@data/range-data';
import { Post, PostService } from '@services/post-service';
import { apiHanler, getLocaleCookie } from '@src/server/utils/api-utils';
import { createResult } from '@utils/create-utils';
import { NextApiRequest, NextApiResponse } from 'next';

export type PostsGetIndex = Result<Post[]>;
async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse<PostsGetIndex>
) {
  const { categoryUID, page = 1, pageSize = MAX_PAGE_SIZE } = req.query;
  const lang = getLocaleCookie(req);
  const queryOptions = { pageSize, page };

  let posts: Post[];

  if (categoryUID && !Array.isArray(categoryUID)) {
    posts = await PostService.getPostsByCategoryUID(
      categoryUID,
      lang,
      queryOptions
    );
  } else {
    posts = await PostService.getPosts(lang, queryOptions);
  }

  return res.status(200).json(createResult(posts));
}

export default apiHanler({ get: getHandler });
