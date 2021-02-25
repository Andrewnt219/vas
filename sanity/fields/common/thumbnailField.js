import { altField } from './altField';

// TODO require alt
export const thumbnailField = {
	name: 'thumbnail',
	title: 'Thumbnail',
	type: 'image',
	description: 'Dùng để preview',
	fields: [altField],
	options: {
		hotspot: true,
		metadata: ['lqip'],
	},
	validation: (Rule) => [Rule.required().error('Cần thiết')],
};
