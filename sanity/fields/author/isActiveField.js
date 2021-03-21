export const isActiveField = {
	name: 'isActive',
	title: 'Active',
	type: 'boolean',
	description: 'Thành viên này có hiện đang làm tại VAS không?',
	validation: (Rule) => Rule.required().error('Cần thiết'),
};
