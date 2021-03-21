import hashtag from '../../schemas/hashtag';

export const hashtagField = {
	name: 'hashtags',
	title: 'Hashtags',
	type: 'array',
	of: [{ type: 'reference', to: { type: hashtag.name } }],
	validation: (Rule) => [Rule.unique().error('Có hashtag trùng lặp')],
};
