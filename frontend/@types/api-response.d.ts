declare module 'api-response' {
	import type { Post } from '@prisma/client';
	type Error = {
		message: string;
	};

	type Response<T extends string> = {
		error: Error | null;
		data: T | null;
	};

	type PostsIncreaseViewsResponse = Response<Post>;

	type PostsSlugResponse = Response<Post>;
}
