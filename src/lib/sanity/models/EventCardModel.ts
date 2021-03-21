import { PostModel } from './PostModel';

export type EventCardModel = Pick<
	PostModel,
	| 'title'
	| 'publishedAt'
	| 'snippet'
	| 'thumbnail'
	| 'location'
	| 'fromDate'
	| 'toDate'
	| 'slug'
>;
