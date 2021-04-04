import { PostResult } from '@api-response';
import { PostDataService } from '@services/post-data-service';
import { apiHanler, getLocaleCookie } from '@src/server/utils/api-utils';
import { NextApiHandler } from 'next';

const get: NextApiHandler<PostResult.GetRelatedPost> = async (req, res) => {
	const { postSlug } = req.query;
	const lang = getLocaleCookie(req);

	if (!postSlug || Array.isArray(postSlug)) {
		return res.status(400).json({
			data: null,
			error: { message: 'Missing or invalid post slug' },
		});
	}

	const relatedPosts = await PostDataService.getRelatedPost(postSlug, lang);

	return res.status(200).json({ data: relatedPosts, error: null });
};

export default apiHanler({ get });
