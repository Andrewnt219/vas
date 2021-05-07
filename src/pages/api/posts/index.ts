import { Result } from '@common';
import { Post, PostService } from '@services/post-service';
import { apiHanler, getLocaleCookie } from '@src/server/utils/api-utils';
import { createResult } from '@utils/create-utils';
import { NextApiRequest, NextApiResponse } from 'next';

export type PostsGetIndex = Result<Post[]>;
async function getHandler(
	req: NextApiRequest,
	res: NextApiResponse<PostsGetIndex>
) {
	const { categoryUID } = req.query;
	const lang = getLocaleCookie(req);

	let posts: Post[];

	if (categoryUID && !Array.isArray(categoryUID)) {
		posts = await PostService.getPostsByCategoryUID(categoryUID, lang);
	} else {
		posts = await PostService.getPosts(lang);
	}

	return res.status(200).json(createResult(posts));
}

export default apiHanler({ get: getHandler });
