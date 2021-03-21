import { ImageModel, imageModelQuery } from './ImageModel';

export type AuthorModel = {
	positions: string[];
	slug: string;
	thumbnail: ImageModel;
	title: string;
	isActive: boolean;
	linkedin?: string;
};

export const authorModelQuery = `
  {
    positions,
    "slug": slug.current,
    "thumbnail": thumbnail.asset -> ${imageModelQuery},
    title,
    isActive,
    linkedin
  }
`;
