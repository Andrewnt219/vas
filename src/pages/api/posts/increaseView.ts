import { IncreaseViewResponse } from '@api-response';
import { FireBasePost } from '@firebase';
import firestore from '@src/lib/firestore';
import firebase from 'firebase-admin';
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

		const postRef = firestore.collection('posts').doc(slug);

		await postRef.update({
			views: firebase.firestore.FieldValue.increment(1),
		});

		const postDoc = await postRef.get();

		if (!postDoc.exists) {
			return res
				.status(404)
				.json({ data: null, error: { message: 'Post not found' } });
		}

		const post = postDoc.data() as FireBasePost;

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
