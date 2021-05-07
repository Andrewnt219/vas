import { Result } from '@common';
import { Post, PostService } from '@services/post-service';
import { apiHanler, getLocaleCookie } from '@src/server/utils/api-utils';
import { createResult, createResultError } from '@utils/create-utils';
import { NextApiRequest, NextApiResponse } from 'next';

export type PostsUIDget = Result<Post>;

async function getHandler(
	req: NextApiRequest,
	res: NextApiResponse<PostsUIDget>
) {
	// TODO check documentations for getting params
	const { uid } = req.query;
	const lang = getLocaleCookie(req);

	if (!uid || typeof uid !== 'string') {
		return res
			.status(400)
			.json(createResultError('Missing or invalid post uid'));
	}

	const post: Post | null = await PostService.getPostByUID(uid, lang);

	if (!post) {
		return res.status(404).json(createResultError('Post not found'));
	}

	return res.status(200).json(createResult(post));
}

export default apiHanler({ get: getHandler });
