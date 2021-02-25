import author from '../../schemas/author';
import { isValidCustomFieldProps } from '../../utils/validation-utils';

export function customAuthorField(props) {
	if (!isValidCustomFieldProps(props)) {
		throw new Error('Invalid props passed to author field');
	}

	return {
		name: 'author',
		title: 'Author',
		type: 'reference',
		to: { type: author.name },
		validation: (Rule) => Rule.required().error('Cần thiết'),
		...props,
	};
}

export const authorField = { ...customAuthorField(null) };
