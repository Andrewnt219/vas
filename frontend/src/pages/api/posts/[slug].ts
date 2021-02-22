import firestore from '@src/lib/firebase/firestore';
import { NextApiHandler } from 'next';

const handler: NextApiHandler<{ data: any; error: Error | null }> = async (
	req,
	res
) => {
	if (req.method !== 'GET') {
		return res.status(405).json({
			data: null,
			error: { message: 'Only GET', name: 'Invalid method' },
		});
	}

	const { slug } = req.query;

	if (!slug) {
		return res.status(400).json({
			data: null,
			error: { name: 'Missing param', message: 'Missing post slug' },
		});
	}

	const snapshot = await firestore
		.collection('entries')
		.where('slug', '==', slug)
		.limit(1)
		.get();

	const post = snapshot.docs[0]?.data();
	if (!post) {
		return res.status(404).json({
			data: null,
			error: { name: 'Not found', message: 'Post slug not found' },
		});
	}

	return res.status(200).json({ data: post, error: null });
};

export default handler;
