import { ImageModel } from './ImageModel';

export type EventCardModel = {
	title: string;
	publishedAt: string;
	snippet: string;
	thumbnail: ImageModel;
	locations: string[];
	fromDate: string;
	toDate: string;
	slug: string;
};
