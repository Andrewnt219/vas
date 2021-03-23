declare module '@common' {
	type PostWihMeta = import('@lib/sanity/models/PostModel').PostModel &
		import('@lib/firestore/models/FsPost').FsPost;
}
