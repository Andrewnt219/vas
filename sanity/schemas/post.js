import { authorField } from '../fields/common/authorField';
import { bodyField } from '../fields/common/bodyField';
import { publishedAtField } from '../fields/common/publishedAt';
import { slugField } from '../fields/common/slugField';
import { thumbnailField } from '../fields/common/thumbnailField';
import { titleField } from '../fields/common/titleField';
import { categoryField } from '../fields/post/categoryField';
import { fromDateField } from '../fields/post/fromDate';
import { hashtagField } from '../fields/post/hashtagField';
import { isArchivedField } from '../fields/post/isArchivedField';
import { locationField } from '../fields/post/locationField';
import { snippetField } from '../fields/post/snippetField';
import { toDateField } from '../fields/post/toDate';
import { i18n } from './documentTranslation';
// TODO generate slug on publish action
// TODO add missing schema (some are optional) (Location, event time, etc.)
export default {
	name: 'post',
	title: 'Post',
	type: 'document',
	i18n,

	initialValue: {
		[isArchivedField.name]: false,
		[publishedAtField.name]: new Date().toISOString(),
		[authorField.name]: {
			_ref: '683e1c33-cde6-4179-a0f3-586b8670dbe4', // dang-mai-phuong
		},
	},

	fields: [
		titleField,
		slugField,
		categoryField,
		hashtagField,
		fromDateField,
		toDateField,
		locationField,
		bodyField,
		thumbnailField,
		snippetField,
		publishedAtField,
		authorField,
		isArchivedField,
	],

	// TODO: preview categories
	preview: {
		select: {
			title: titleField.name,
			author: `${authorField.name}.title`,
			media: thumbnailField.name,
			isArchived: isArchivedField.name,
		},
		prepare(selection) {
			const { author, title, isArchived } = selection;
			let attributedTitle = title;

			if (isArchived) {
				attributedTitle = '📦 ' + attributedTitle;
			}

			return {
				...selection,
				title: attributedTitle,
				subtitle: `By ${author}`,
			};
		},
	},

	// orderings: [

	// ],
};
