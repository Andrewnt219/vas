import { PostModel } from './PostModel';

export type OrientationCardModel = Pick<
	PostModel,
	| 'fromDate'
	| 'toDate'
	| 'title'
	| 'snippet'
	| 'locations'
	| 'slug'
	| 'thumbnail'
>;
