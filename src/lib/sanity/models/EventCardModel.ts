import { PostModel } from './PostModel';

export type EventCardModel = Pick<
	PostModel,
	| 'title'
	| 'publishedAt'
	| 'snippet'
	| 'thumbnail'
	| 'locations'
	| 'fromDate'
	| 'toDate'
	| 'slug'
>;
