import firestore from '@lib/firestore';
import { sanityClient } from '@lib/sanity/sanity-clients';
export class StatsDataService {
	private static collection = firestore.collection('stats');
	private static cms = sanityClient;

	public static async countProjects(): Promise<number> {
		return (await this.collection.doc('projects').get()).data()?.count ?? 0;
	}
}
