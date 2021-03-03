import { PostModel } from './PostModel';

export type NewsCardModel = Pick<
	PostModel,
	'title' | 'snippet' | 'thumbnail'
> & {
	subcategory: string;
};
