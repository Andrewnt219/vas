export type PostModel = {
	title: string;
	slug: string;
	content: string;
	_createdAt: string;
	_id: string;
};

export const postModelQuery = `
	{
		_id,
		_createdAt,
		title,
		content,
		"slug": slug.current 
	}
`;
