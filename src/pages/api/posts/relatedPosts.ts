import { RelatedPostResponse } from '@api-response';
import { DEFAULT_LANGUAGE } from '@data/localization-data';
import { PostDataService } from '@services/post-data-service';
import { isValidLocale } from '@utils/validate-utils';
import cookie from 'cookie';
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

		const { NEXT_LOCALE } = cookie.parse(req.headers.cookie ?? '');

		if (!postSlug || Array.isArray(postSlug)) {
			return res.status(400).json({
				data: null,
				error: { message: 'Missing or invalid post slug' },
			});
		}

		const relatedPosts = await PostDataService.getRelatedPost(
			postSlug,
			isValidLocale(NEXT_LOCALE) ? NEXT_LOCALE : DEFAULT_LANGUAGE
		);

		return res.status(200).json({ data: relatedPosts, error: null });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			data: null,
			error: { message: 'Something went wrong' },
		});
	}
};

export default handler;
