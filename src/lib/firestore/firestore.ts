import admin, { ServiceAccount } from 'firebase-admin';
import { getDecryptedServiceAccount } from './decrypt-service-account';

if (!admin.apps.length) {
	try {
		const serviceAccountKeyJSON: ServiceAccount = getDecryptedServiceAccount();

		if (!serviceAccountKeyJSON) {
			throw new Error('Missing serviceAccountKey env');
		}

		admin.initializeApp({
			credential: admin.credential.cert(serviceAccountKeyJSON),
		});
	} catch (error) {
		console.error('Firebase admin initialization error:' + error);
	}
}

export default admin.firestore();
