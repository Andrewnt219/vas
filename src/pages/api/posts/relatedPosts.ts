import { Result } from '@common';
import { PostService, RelatedPostsResult } from '@services/post-service';
import { apiHanler, getLocaleCookie } from '@src/server/utils/api-utils';
import { NextApiHandler } from 'next';

export type PostsGetRelatedPosts = Result<RelatedPostsResult>;

const get: NextApiHandler<PostsGetRelatedPosts> = async (req, res) => {
	const { postUID } = req.query;
	const lang = getLocaleCookie(req);

	if (!postUID || typeof postUID !== 'string') {
		return res.status(400).json({
			data: null,
			error: { message: 'Missing or invalid post uid' },
		});
	}

	const { main, relatedPosts } = await PostService.getRelatedPosts(
		postUID,
		lang
	);

	if (!main) {
		return res
			.status(404)
			.json({ data: null, error: { message: 'Post not found' } });
	}

	return res.status(200).json({ data: { main, relatedPosts }, error: null });
};

export default apiHanler({ get });
