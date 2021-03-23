import { RelatedPostResponse } from '@api-response';
import { PostDataService } from '@services/post-data-service';
import { isValidCategorySlug } from '@utils/validate-utils';
import { NextApiHandler } from 'next';

const handler: NextApiHandler<RelatedPostResponse> = async (req, res) => {
	try {
		if (req.method !== 'GET') {
			return res.status(405).json({
				data: null,
				error: { message: 'Only GET' },
			});
		}

		const { categorySlug } = req.query;

		if (!categorySlug || !isValidCategorySlug(categorySlug)) {
			return res.status(400).json({
				data: null,
				error: { message: 'Missing or invalid category slug' },
			});
		}

		const relatedPosts = await PostDataService.getPostsByCategory(categorySlug);

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
