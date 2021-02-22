import { Buffer } from 'buffer';
import admin, { ServiceAccount } from 'firebase-admin';

if (!admin.apps.length) {
	try {
		if (!process.env.FIRESTORE_SERVICE_ACCOUNT_BASE64) {
			throw new Error('Missing serviceAccountKey env');
		}

		const serviceAccountKeyJSON: ServiceAccount = JSON.parse(
			Buffer.from(
				process.env.FIRESTORE_SERVICE_ACCOUNT_BASE64,
				'base64'
			).toString('ascii')
		);

		admin.initializeApp({
			credential: admin.credential.cert(serviceAccountKeyJSON),
		});
	} catch (error) {
		console.error('Firebase admin initialization error:' + error);
	}
}

export default admin.firestore();
