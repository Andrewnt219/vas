export const bodyField = {
	name: 'body',
	title: 'Body',
	type: 'blockContent',
	validation: (Rule) => Rule.required().error('Cần thiết'),
	options: {
		metadata: ['lqip'],
	},
};
