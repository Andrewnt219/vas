declare module '@api-response' {
	import { PostWihMeta } from '@common';
	import { FsPost } from '@lib/firestore/models/FsPost';
	import { PostModel } from '@lib/sanity/models/PostModel';

	type Error = {
		message: string;
	};

	type Response<Data> = {
		error: Error | null;
		data: Data | null;
	};

	type IncreaseViewResponse = Response<FsPost>;
	type GetPostResponse = Response<PostWihMeta>;

	type RelatedPostResponse = Response<PostModel[]>;
}
