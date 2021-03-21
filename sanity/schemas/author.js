import { isActiveField } from '../fields/author/isActiveField';
import { linkedInField } from '../fields/author/linkedInField';
import { positionField } from '../fields/author/positionField';
import { customDescriptionField } from '../fields/common/descriptionField';
import { slugField } from '../fields/common/slugField';
import { thumbnailField } from '../fields/common/thumbnailField';
import { titleField } from '../fields/common/titleField';

export default {
	name: 'author',
	title: 'Author',
	type: 'document',

	initialValue: {
		[isActiveField.name]: true,
	},

	fields: [
		isActiveField,
		titleField,
		slugField,
		positionField,
		thumbnailField,
		customDescriptionField({ description: 'Biography' }),
		linkedInField,
	],

	preview: {
		select: {
			title: titleField.name,
			media: thumbnailField.name,
			isActive: isActiveField.name,
			positions: positionField.name,
		},
		prepare(selection) {
			const { title, isActive, positions } = selection;

			const attributedTitle = (isActive ? '🟢 ' : '⚫ ') + title;

			const subtitle = positions.join(', ');

			return {
				...selection,
				title: attributedTitle,
				subtitle,
			};
		},
	},
};
