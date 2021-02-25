import category from '../../schemas/category';

export const categoryField = {
	name: 'categories',
	title: 'Categories',
	type: 'array',
	of: [{ type: 'reference', to: { type: category.name } }],
	validation: (Rule) => [
		Rule.required().min(1).error('Cần thiết'),
		Rule.unique().error('Có category trùng lặp'),
	],
};
