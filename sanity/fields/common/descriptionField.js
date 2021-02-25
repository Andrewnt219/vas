import { isValidCustomFieldProps } from '../../utils/validation-utils';

export function customDescriptionField(props) {
	if (!isValidCustomFieldProps(props)) {
		throw new Error('Invalid props passed to description field');
	}

	return {
		name: 'description',
		title: 'Description',
		type: 'text',
		...props,
	};
}

export const descriptionField = {
	...customDescriptionField(null),
};
