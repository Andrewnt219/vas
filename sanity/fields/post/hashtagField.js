import hashtag from '../../schemas/hashtag';

export const hashtagField = {
	name: 'hashtags',
	title: 'Hashtags',
	type: 'array',
	of: [{ type: 'reference', to: { type: hashtag.name } }],
	validation: (Rule) => [
		Rule.required().min(1).error('Cần thiết'),
		Rule.unique().error('Có category trùng lặp'),
	],
};
