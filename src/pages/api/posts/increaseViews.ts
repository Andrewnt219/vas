import { IncreaseViewResponse, Response } from '@api-response';
import { PostDataService } from '@services/post-data-service';
import { errorHandler } from '@src/server/utils/api-utils';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler<Response<any>> = async (req, res) => {
	try {
		switch (req.method?.toLowerCase()) {
			case 'patch':
				return patchHandler(req, res);

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

async function patchHandler(
	req: NextApiRequest,
	res: NextApiResponse<IncreaseViewResponse>
) {
	const { slug } = req.body;

	if (slug === undefined) {
		return res.status(400).json({
			data: null,
			error: { message: 'Missing slug' },
		});
	}

	const fsPost = await PostDataService.increaseViews(slug);

	if (!fsPost) {
		return res
			.status(404)
			.json({ data: null, error: { message: 'Post not found' } });
	}

	return res.status(200).json({ data: fsPost, error: null });
}

export default handler;
