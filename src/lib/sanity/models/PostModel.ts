// TODO move to @types

import { ImageModel } from './ImageModel';

/**
 * @description the stucture of sanity quired post
 */
export type PostModel = {
	title: string;
	slug: string;
	body: string;
	_createdAt: string;
	_id: string;
	_lang: string;
	publishedAt: string;
	snippet: string;
	locations: string[];
	fromDate: string;
	toDate: string;
	thumbnail: ImageModel;
};

export const postModelQuery = `*[_type == 'post'] {...}`;
