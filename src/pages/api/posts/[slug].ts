import { PostResponse, Response } from '@api-response';
import { PostDataService } from '@services/post-data-service';
import { errorHandler } from '@src/server/utils/api-utils';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler<Response<any>> = (req, res) => {
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
	res: NextApiResponse<PostResponse.GetSlug>
) {
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

	const postMeta = await PostDataService.getFsPost(slug);
	const post = await PostDataService.getPostBySlug(slug);

	if (!post || !postMeta) {
		return res.status(404).json({
			data: null,
			error: { message: 'Post not found' },
		});
	}

	return res.status(200).json({ data: { ...postMeta, ...post }, error: null });
}

export default handler;
