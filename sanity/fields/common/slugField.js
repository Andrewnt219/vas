export const slugField = {
	name: 'slug',
	title: 'Slug',
	type: 'slug',
	description: 'Một khi đã publish, hỏi developers trước khi chỉnh ô này',
	options: {
		source: 'title',
		maxLength: 96,
	},
	validation: (Rule) =>
		Rule.required().error('Cần thiết, ấn generate nếu không biết ghi gì.'),
};
