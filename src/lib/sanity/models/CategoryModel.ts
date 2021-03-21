import { ImageModel, imageModelQuery } from './ImageModel';

export type CategoryModel = {
	slug: string;
	description: string;
	thumbnail: ImageModel;
	title: string;
};

export type CategorySlug = 'news' | 'events' | 'orientaion' | 'tet' | 'blog';

export const categoryModelQuery = `
	{
		"slug": slug.current,
		description,
		"thumbnail": thumbnail.asset -> ${imageModelQuery},
		title
	}
`;
