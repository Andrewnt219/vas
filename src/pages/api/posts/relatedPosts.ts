import { Result } from '@common';
import { Post, PostService } from '@services/post-service';
import { apiHanler, getLocaleCookie } from '@src/server/utils/api-utils';
import { NextApiHandler } from 'next';

export type PostsGetRelatedPosts = Result<Post[]>;

const get: NextApiHandler<PostsGetRelatedPosts> = async (req, res) => {
	const { postID } = req.query;
	const lang = getLocaleCookie(req);

	if (!postID || typeof postID !== 'string') {
		return res.status(400).json({
			data: null,
			error: { message: 'Missing or invalid post uid' },
		});
	}

	const relatedPosts = await PostService.getRelatedPosts(postID, lang);

	return res.status(200).json({ data: relatedPosts, error: null });
};

export default apiHanler({ get });
