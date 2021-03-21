import { ImageModel, imageModelQuery } from './ImageModel';

export type HashtagModel = {
	slug: string;
	description: string;
	thumbnail: ImageModel;
	title: string;
};

export const hashtagModelQuery = `
	{
		"slug": slug.current,
		description,
		"thumbnail": thumbnail.asset -> ${imageModelQuery},
		title
	}
`;
