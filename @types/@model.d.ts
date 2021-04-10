declare module '@model' {
	import { FsPost } from '@lib/firestore/models/FsPost';
	import { PostDocument } from '@lib/prismic/models/PostModel';
	type Post = PostDocument & { meta: FsPost | null };
}
