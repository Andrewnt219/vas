export const positionField = {
	name: 'positions',
	title: 'Position',
	description: 'Tên vị trí tại VAS',
	type: 'array',
	of: [{ type: 'string' }],
	options: {
		list: [
			{ title: 'President', value: 'President' },
			{ title: 'Vice President', value: 'Vice President' },
			{ title: 'Advisor', value: 'Advisor' },
			{ title: 'Secretary', value: 'Secretary' },
			{ title: 'Treasurer', value: 'Treasurer' },
			{ title: 'Content Creator', value: 'Content Creator' },
			{ title: 'Video Editor', value: 'Video Editor' },
			{ title: 'Event Coordinator', value: 'Event Coordinator' },
			{ title: 'Graphic Designer', value: 'Graphic Designer' },
			{ title: 'Web Developer', value: 'Web Developer' },
		],
	},
	validation: (Rule) => Rule.required().error('Cần thiết'),
};
