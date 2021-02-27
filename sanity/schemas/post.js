import { authorField } from '../fields/common/authorField';
import { bodyField } from '../fields/common/bodyField';
import { createdAtField } from '../fields/common/createdAtField';
import { slugField } from '../fields/common/slugField';
import { thumbnailField } from '../fields/common/thumbnailField';
import { titleField } from '../fields/common/titleField';
import { categoryField } from '../fields/post/categoryField';
import { isArchivedField } from '../fields/post/isArchivedField';
import { seoFields } from '../fields/post/seoFields';
import { snippetField } from '../fields/post/snippetField';
import { i18n } from './documentTranslation';
// TODO generate slug on publish action
// TODO set up SEO for the post
//
export default {
	name: 'post',
	title: 'Post',
	type: 'document',
	i18n,

	initialValue: {
		[isArchivedField.name]: false,
		[createdAtField.name]: new Date().toISOString(),
		[authorField.name]: {
			_ref: '683e1c33-cde6-4179-a0f3-586b8670dbe4', // dang-mai-phuong
		},
	},

	fields: [
		titleField,
		slugField,
		categoryField,
		bodyField,
		thumbnailField,
		snippetField,
		createdAtField,
		authorField,
		isArchivedField,
		seoFields,
	],

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
