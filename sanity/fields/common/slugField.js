export const slugField = {
	name: 'slug',
	title: 'Slug',
	type: 'slug',
	description: 'Một khi đã publish, hỏi developers trước khi chỉnh ô này',
	options: {
		source: (doc) => {
			if (doc._lang) return `${doc._lang}-${doc.title}`;

			return doc.title;
		},
		maxLength: 96,
	},
	validation: (Rule) => [
		Rule.required().error(
			'Cần thiết hoặc trùng lặp. Ấn generate nếu không biết ghi gì.'
		),
	],
};
