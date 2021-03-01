export const publishedAtField = {
	name: 'publishedAt',
	title: 'Published At',
	type: 'datetime',
	options: {
		dateFormat: 'MMM DD YYYY',
	},
	validation: (Rule) => Rule.required().error('Cần thiết'),
	description: 'Ngày giờ đăng/tạo',
};
