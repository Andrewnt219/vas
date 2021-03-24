import { RelatedPostResponse } from '@api-response';
import { DEFAULT_LANGUAGE } from '@data/localization-data';
import { PostDataService } from '@services/post-data-service';
import { errorHandler, getLocaleCookie } from '@src/server/utils/api-utils';
import { isValidLocale } from '@utils/validate-utils';
import { NextApiHandler } from 'next';

const handler: NextApiHandler<RelatedPostResponse> = async (req, res) => {
	try {
		if (req.method !== 'GET') {
			return res.status(405).json({
				data: null,
				error: { message: 'Only GET' },
			});
		}

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
	} catch (error) {
		return errorHandler(req, res, error);
	}
};

export default handler;
