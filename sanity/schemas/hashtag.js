import { customDescriptionField } from '../fields/common/descriptionField';
import { slugField } from '../fields/common/slugField';
import { thumbnailField } from '../fields/common/thumbnailField';
import { titleField } from '../fields/common/titleField';

export default {
	name: 'hashtag',
	title: 'Hashtag',
	type: 'document',

	fields: [
		titleField,
		slugField,
		customDescriptionField({ description: 'Miêu tả hashtag này' }),
		thumbnailField,
	],
};
