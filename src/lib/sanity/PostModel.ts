// TODO move to @types
/**
 * @description the stucture of sanity quired post
 */
export type PostModel = {
	title: string;
	slug: string;
	body: string;
	_createdAt: string;
	_id: string;
	_lang: string;
};

/**
 * @description the query structure for a post
 */
export const postModelQuery = `
	{
		_id,
		_lang,
		_createdAt,
		title,
		body,
		"slug": slug.current 
	}
`;
