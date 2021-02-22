import { PostDataService } from '@src/services/post-data-service';
import { PostsSlugResponse } from 'api-response';
import { NextApiHandler } from 'next';

const handler: NextApiHandler<PostsSlugResponse> = async (req, res) => {
	try {
		if (req.method !== 'GET') {
			return res.status(405).json({
				data: null,
				error: { message: 'Only GET' },
			});
		}

		const { slug } = req.query;

		if (!slug || slug instanceof Array) {
			return res.status(400).json({
				data: null,
				error: { message: 'Invalid/missing slug param' },
			});
		}

		const post = await PostDataService.getPost(slug);

		if (!post) {
			return res
				.status(500)
				.json({ error: { message: 'Something went wrong' }, data: null });
		}

		return res.status(200).json({ data: post, error: null });
	} catch (error) {
		console.log(error);

		return res
			.status(500)
			.json({ error: { message: 'Something went wrong' }, data: null });
	}
};

export default handler;
