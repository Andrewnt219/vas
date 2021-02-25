export const snippetField = {
	name: 'snippet',
	title: 'Content snippet',
	type: 'text',
	description: 'Một đoạn ngắn để preview bài viết',
	validation: (Rule) => [
		Rule.required().error('Cần thiết'),
		Rule.max(300).warning('Ngắn ngắn thôi, spoil nhiều thế =)).'),
	],
	rows: 3,
};
