import firestore from '@src/lib/firebase/firestore';
import firebase from 'firebase-admin';
import { NextApiHandler } from 'next';

type Response = {
	error: Error | null;
	message: string;
};

const handler: NextApiHandler<Response> = async (req, res) => {
	try {
		if (req.method !== 'PATCH') {
			return res.status(405).json({
				message: '',
				error: { message: 'Only PATCH', name: 'Invalid method' },
			});
		}

		const { slug } = req.body;

		if (slug === undefined) {
			return res.status(400).json({
				message: '',
				error: { message: 'Missing slug', name: 'Invalid parameters' },
			});
		}

		await firestore
			.collection('entries')
			.doc(slug)
			.update({
				views: firebase.firestore.FieldValue.increment(1),
			});

		return res.status(200).json({ message: 'OK', error: null });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: '',
			error: { message: 'Something went wrong', name: 'Server error' },
		});
	}
};
export default handler;
