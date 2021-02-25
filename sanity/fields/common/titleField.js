import { isValidCustomFieldProps } from '../../utils/validation-utils';

export function customTitleField(props) {
	if (!isValidCustomFieldProps(props)) {
		throw new Error('Invalid props passed to title field');
	}

	return {
		name: 'title',
		title: 'Title',
		type: 'string',
		validation: (Rule) => [
			Rule.required().error('Quên đặt tựa.'),
			Rule.max(200).warning(
				'Tựa quá dài có thể ảnh hưởng tới thẩm mỹ của web, cơ mà tùy tâm =))'
			),
		],
		...props,
	};
}

export const titleField = { ...customTitleField(null) };
