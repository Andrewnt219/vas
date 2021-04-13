export type PostMeta = {
	views: number;
	id: string;
	comments: {
		name: string;
		email: string;
		createdAt: Date;
	}[];
};
