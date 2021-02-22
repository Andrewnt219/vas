import { PostDataService } from '@src/services/post-data-service';
import { PostsIncreaseViewsResponse } from 'api-response';
import { NextApiHandler } from 'next';

const handler: NextApiHandler<PostsIncreaseViewsResponse> = async (
	req,
	res
) => {
	try {
		if (req.method !== 'PATCH') {
			return res.status(405).json({
				data: null,
				error: { message: 'Only PATCH' },
			});
		}

		const { slug } = req.body;

		if (slug === undefined) {
			return res.status(400).json({
				data: null,
				error: { message: 'Missing slug' },
			});
		}

		const updatedPost = await PostDataService.increaseViews(slug);

		if (!updatedPost) {
			return res.status(500).json({
				data: null,
				error: { message: 'Something went wrong' },
			});
		}

		return res.status(200).json({ data: updatedPost, error: null });
	} catch (error) {
		console.log(error);

		return res.status(500).json({
			data: null,
			error: { message: 'Something went wrong' },
		});
	}
};
export default handler;
