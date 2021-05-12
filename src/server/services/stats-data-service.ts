import firestore from '@lib/firestore/firestore';

export class StatsDataService {
	private static collection = firestore.collection('stats');

	public static async countProjects(): Promise<number> {
		return (await this.collection.doc('projects').get()).data()?.count ?? 0;
	}
}
