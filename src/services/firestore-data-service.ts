import { SurveyFsModel } from '@src/model/firebase/SurveyModel';
import { AxiosError } from 'axios';

export class FireStoreDataService {
	private static instance: FireStoreDataService;
	private static db: firebase.default.firestore.Firestore | null = null;

	private static setup = async () => {
		try {
			FireStoreDataService.db = (
				await import('@src/lib/firebase/firestore')
			).default;
		} catch (error) {
			console.error('Fail to import db');
		}
	};

	public static async getInstance(): Promise<FireStoreDataService> {
		if (!FireStoreDataService.instance) {
			FireStoreDataService.instance = new FireStoreDataService();
		}

		if (!FireStoreDataService.db) {
			await FireStoreDataService.setup();
		}

		return FireStoreDataService.instance;
	}

	addOrientationSurvey = async (survey: SurveyFsModel): Promise<void> => {
		FireStoreDataService.db
			?.collection('survey')
			.add(survey)
			.catch((error) => {
				console.log((error as AxiosError).message);
				console.log(error);
			});
	};
}
