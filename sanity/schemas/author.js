import { customDescriptionField } from '../fields/common/descriptionField';
import { slugField } from '../fields/common/slugField';
import { thumbnailField } from '../fields/common/thumbnailField';
import { titleField } from '../fields/common/titleField';

export default {
	name: 'author',
	title: 'Author',
	type: 'document',
	fields: [
		titleField,
		slugField,
		thumbnailField,
		customDescriptionField({ description: 'Biography' }),
	],
	preview: {
		select: {
			title: titleField.name,
			media: thumbnailField.name,
		},
	},
};
