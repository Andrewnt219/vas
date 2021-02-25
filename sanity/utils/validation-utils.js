export function isValidCustomFieldProps(props) {
	if (!props) return true;

	const { name, title, type } = props;

	// These props should not exist
	return !name && !title && !type;
}
