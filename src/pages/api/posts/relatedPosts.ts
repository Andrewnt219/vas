import { PostResponse } from '@api-response';
import { DEFAULT_LANGUAGE } from '@data/localization-data';
import { PostDataService } from '@services/post-data-service';
import { apiHanler, getLocaleCookie } from '@src/server/utils/api-utils';
import { isValidLocale } from '@utils/validate-utils';
import { NextApiHandler } from 'next';

const get: NextApiHandler<PostResponse.GetRelatedPost> = async (req, res) => {
	const { postSlug } = req.query;
	const NEXT_LOCALE = getLocaleCookie(req);

	if (!postSlug || Array.isArray(postSlug)) {
		return res.status(400).json({
			data: null,
			error: { message: 'Missing or invalid post slug' },
		});
	}

	const lang = isValidLocale(NEXT_LOCALE) ? NEXT_LOCALE : DEFAULT_LANGUAGE;
	const relatedPosts = await PostDataService.getRelatedPost(postSlug, lang);

	return res.status(200).json({ data: relatedPosts, error: null });
};

export default apiHanler({ get });
