import { IncreaseViewResponse } from '@api-response';
import { PostDataService } from '@services/post-data-service';
import { NextApiHandler } from 'next';

const handler: NextApiHandler<IncreaseViewResponse> = async (req, res) => {
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

		const post = await PostDataService.increaseViews(slug);

		if (!post) {
			return res
				.status(404)
				.json({ data: null, error: { message: 'Post not found' } });
		}

		return res.status(200).json({ data: post.views, error: null });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			data: null,
			error: { message: 'Something went wrong' },
		});
	}
};

export default handler;
