import { PostResult } from '@api-response';
import { PostService } from '@services/post-service';
import { apiHanler } from '@src/server/utils/api-utils';
import { NextApiRequest, NextApiResponse } from 'next';

async function patchHandler(
	req: NextApiRequest,
	res: NextApiResponse<PostResult.PatchIncreaseView>
) {
	const { id } = req.body;

	if (!id || typeof id !== 'string') {
		return res.status(400).json({
			data: null,
			error: { message: 'Missing or invalid post id' },
		});
	}

	const views = await PostService.increaseViews(id);

	return res.status(200).json({ data: views, error: null });
}

export default apiHanler({ patch: patchHandler });
