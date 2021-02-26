import { GetPostResponse } from '@api-response';
import { FireBasePost } from '@firebase';
import firestore from '@src/lib/firestore';
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

	const postDoc = await firestore.collection('posts').doc(slug).get();

	if (!postDoc.exists) {
		return res.status(404).json({
			data: null,
			error: { message: 'Post not found' },
		});
	}

	const post = postDoc.data() as FireBasePost;

	return res.status(200).json({ data: post, error: null });
};

export default handler;
