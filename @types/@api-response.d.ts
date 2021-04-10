declare module '@api-response' {
	import { FsPost } from '@lib/firestore/models/FsPost';
	import { Post } from '@model';
	import { RelatedPostsResult } from '@services/post-service';
	import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

	type Error = {
		message: string;
	};

	type ResultError = {
		error: Error;
		data: null;
	};

	type StaticPropsError = GetStaticPropsResult<
		ResultError & { preview: boolean }
	>;

	type StaticPathError = GetStaticPathsResult<any>;

	type Result<Data, Meta = {}> = {
		error: Error | null;
		data: Data | null;
		meta?: Meta;
	};

	namespace PostResult {
		type PatchIncreaseView = Result<FsPost>;
		type GetUID = Result<Post>;

		type GetRelatedPost = Result<RelatedPostsResult>;

		type GetIndex = Result<Post[]>;
	}
}
