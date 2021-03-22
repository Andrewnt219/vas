import { ImageModel, imageModelQuery } from './ImageModel';

export type CategoryModel = {
	slug: string;
	description: string;
	thumbnail: ImageModel;
	title: string;
};

export const categorySlugs = [
	'news',
	'events',
	'orientation',
	'tet',
	'blog',
] as const;
export type CategorySlug = typeof categorySlugs[number];

export const categoryModelQuery = `
	{
		"slug": slug.current,
		description,
		"thumbnail": thumbnail.asset -> ${imageModelQuery},
		title
	}
`;
