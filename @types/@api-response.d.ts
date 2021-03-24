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

	type LoadingResponse = {
		data: null;
		error: null;
	};

	type Response<Data> = LoadingResponse | ErrorResponse | SuccessResponse<Data>;

	namespace PostResponse {
		type PatchIncreaseView = Response<FsPost>;
		type GetSlug = Response<PostWihMeta>;

		type GetRelatedPost = Response<PostModel[]>;

		type GetIndex = Response<PostWihMeta[]>;
	}
}
