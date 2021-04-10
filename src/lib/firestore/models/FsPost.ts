export type FsPost = {
	id: string;
	views: number;
	comments: {
		name: string;
		email: string;
		createdAt: string;
	}[];
};
