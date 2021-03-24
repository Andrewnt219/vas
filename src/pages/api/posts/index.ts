import { Response } from '@api-response';
import { PostWihMeta } from '@common';
import { DEFAULT_LANGUAGE } from '@data/localization-data';
import { PostDataService } from '@services/post-data-service';
import { errorHandler, getLocaleCookie } from '@src/server/utils/api-utils';
import { isValidCategorySlug, isValidLocale } from '@utils/validate-utils';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler = (req, res) => {
	try {
		switch (req.method?.toLowerCase()) {
			case 'get':
				return getHandler(req, res);

			default:
				return res.status(405).json({
					data: null,
					error: {
						message: 'Method Not Allowed',
					},
				});
		}
	} catch (error) {
		errorHandler(req, res, error);
	}
};

async function getHandler(
	req: NextApiRequest,
	res: NextApiResponse<Response<PostWihMeta[]>>
) {
	const { categorySlug } = req.query;

	const NEXT_LOCALE = getLocaleCookie(req);
	const lang = isValidLocale(NEXT_LOCALE) ? NEXT_LOCALE : DEFAULT_LANGUAGE;

	let posts: PostWihMeta[];

	if (categorySlug && isValidCategorySlug(categorySlug)) {
		posts = await PostDataService.getPostsWithMetaByCategory(
			categorySlug,
			lang
		);
	} else {
		posts = await PostDataService.getPostsWithMeta(lang);
	}
	return res.status(200).json({
		data: posts,
		error: null,
	});
}

export default handler;
