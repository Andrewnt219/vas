declare module '@api-response' {
	import type { FireBasePost } from '@firebase';
	type Error = {
		message: string;
	};

	type Response<Data> = {
		error: Error | null;
		data: Data | null;
	};

	type IncreaseViewResponse = Response<number>;
	type GetPostResponse = Response<FireBasePost>;
}
