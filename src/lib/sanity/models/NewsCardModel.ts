import { PostModel } from './PostModel';

export type NewsCardModel = Pick<
	PostModel,
	'title' | 'snippet' | 'thumbnail' | 'slug'
> & {
	subcategory: string;
};
