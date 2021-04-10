import { PostResult } from '@api-response';
import { Post } from '@model';
import { PostService } from '@services/post-service';
import { apiHanler, getLocaleCookie } from '@src/server/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

async function getHandler(
	req: NextApiRequest,
	res: NextApiResponse<PostResult.GetUID>
) {
	// TODO check documentations for getting params
	const { uid } = req.query;
	const lang = getLocaleCookie(req);

	if (!uid || typeof uid !== 'string') {
		return res.status(400).json({
			data: null,
			error: { message: 'Missing or invalid post uid' },
		});
	}

	const post: Post | null = await PostService.getPostByUID(uid, lang);

	if (!post) {
		return res.status(404).json({
			data: null,
			error: { message: 'Post not found' },
		});
	}

	return res.status(200).json({ data: post, error: null });
}

export default apiHanler({ get: getHandler });
