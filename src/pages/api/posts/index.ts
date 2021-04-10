import { PostResult } from '@api-response';
import { Post } from '@model';
import { PostService } from '@services/post-service';
import { apiHanler, getLocaleCookie } from '@src/server/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

async function getHandler(
	req: NextApiRequest,
	res: NextApiResponse<PostResult.GetIndex>
) {
	const { categoryUID } = req.query;
	const lang = getLocaleCookie(req);

	let posts: Post[];

	if (categoryUID && !Array.isArray(categoryUID)) {
		posts = await PostService.getPostsByCategoryUID(categoryUID, lang);
	} else {
		posts = await PostService.getPosts(lang);
	}

	return res.status(200).json({
		data: posts,
		error: null,
	});
}

export default apiHanler({ get: getHandler });
