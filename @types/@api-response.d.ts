declare module '@api-response' {
	import { PostWihMeta } from '@common';
	import { FsPost } from '@lib/firestore/models/FsPost';
	import { PostModel } from '@lib/sanity/models/PostModel';
	type Error = {
		message: string;
	};

	type ResultError = {
		error: Error;
		data: null;
	};

	type Result<Data> = {
		error: Error | null;
		data: Data | null;
	};

	namespace PostResult {
		type PatchIncreaseView = Result<FsPost>;
		type GetSlug = Result<PostWihMeta>;

		type GetRelatedPost = Result<PostModel[]>;

		type GetIndex = Result<PostWihMeta[]>;
	}
}
