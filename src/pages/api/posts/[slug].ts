import { GetPostResponse } from '@api-response';
import { PostDataService } from '@services/post-data-service';
import { NextApiHandler } from 'next';

const handler: NextApiHandler<GetPostResponse> = async (req, res) => {
	if (req.method !== 'GET') {
		return res.status(405).json({
			data: null,
			error: { message: 'Only GET' },
		});
	}

	const { slug } = req.query;

	if (!slug) {
		return res.status(400).json({
			data: null,
			error: { message: 'Missing post slug' },
		});
	}

	if (slug instanceof Array) {
		return res.status(400).json({
			data: null,
			error: { message: 'Invalid slug' },
		});
	}

	const postMeta = await PostDataService.getPostMeta(slug);

	if (!postMeta) {
		return res.status(404).json({
			data: null,
			error: { message: 'Post not found' },
		});
	}

	return res.status(200).json({ data: postMeta, error: null });
};

export default handler;
