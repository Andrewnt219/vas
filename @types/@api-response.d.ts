declare module '@api-response' {
	import { PostWihMeta } from '@common';
	import { FsPost } from '@lib/firestore/models/FsPost';
	import { PostModel } from '@lib/sanity/models/PostModel';

	type Error = {
		message: string;
	};

	type ErrorResponse = {
		error: Error;
		data: null;
	};

	type SuccessResponse<Data> = {
		error: null;
		data: Data;
	};

	type Response<Data> = ErrorResponse | SuccessResponse<Data>;

	type IncreaseViewResponse = Response<FsPost>;
	type GetPostResponse = Response<PostWihMeta>;

	type RelatedPostResponse = Response<PostModel[]>;
}
