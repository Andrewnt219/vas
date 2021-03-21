import { PostModel } from './PostModel';

export type OrientationCardModel = Pick<
	PostModel,
	| 'fromDate'
	| 'toDate'
	| 'title'
	| 'snippet'
	| 'location'
	| 'slug'
	| 'thumbnail'
>;
