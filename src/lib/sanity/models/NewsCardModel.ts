import { FsPost } from '@lib/firestore/models/FsPost';
import { PostModel } from './PostModel';

export type NewsCardModel = Pick<
	PostModel,
	'title' | 'snippet' | 'thumbnail' | 'slug' | 'hashtags'
> &
	FsPost;
