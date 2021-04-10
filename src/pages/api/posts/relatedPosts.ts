import { PostResult } from '@api-response';
import { PostService } from '@services/post-service';
import { apiHanler, getLocaleCookie } from '@src/server/utils/api-utils';
import { NextApiHandler } from 'next';

const get: NextApiHandler<PostResult.GetRelatedPost> = async (req, res) => {
	const { uid } = req.query;
	const lang = getLocaleCookie(req);

	if (!uid || typeof uid !== 'string') {
		return res.status(400).json({
			data: null,
			error: { message: 'Missing or invalid post uid' },
		});
	}

	const { main, relatedPosts } = await PostService.getRelatedPosts(uid, lang);

	if (!main) {
		return res
			.status(404)
			.json({ data: null, error: { message: 'Post not found' } });
	}

	return res.status(200).json({ data: { main, relatedPosts }, error: null });
};

export default apiHanler({ get });
