import { PostResult } from '@api-response';
import { PostDataService } from '@services/post-data-service';
import { apiHanler } from '@src/server/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

async function patchHandler(
	req: NextApiRequest,
	res: NextApiResponse<PostResult.PatchIncreaseView>
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

export default apiHanler({ patch: patchHandler });
