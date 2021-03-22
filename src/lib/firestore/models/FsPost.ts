export type FsPost = {
	views: number;
	comments: {
		name: string;
		email: string;
		createdAt: string;
	}[];
};
