// TODO move to @types
/**
 * @description the stucture of sanity quired post
 */
export type PostModel = {
	title: string;
	slug: string;
	content: string;
	_createdAt: string;
	_id: string;
};

/**
 * @description the query structure for a post
 */
export const postModelQuery = `
	{
		_id,
		_createdAt,
		title,
		content,
		"slug": slug.current 
	}
`;
