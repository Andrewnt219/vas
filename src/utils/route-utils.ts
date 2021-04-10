/**
 * '/controller/posts/...' -> 'controller'
 */
export function getControllerFromPath(path: string) {
	// Get the first group after the /, name it controller
	const matches = path.match(/\/?(?<controller>\w+)/);

	if (matches && matches.groups?.controller) {
		return matches.groups.controller;
	}

	return null;
}

/* -------------------------------------------------------------------------- */
export const getHashtagLink = (hashtagUID: string) => `/hashtags/${hashtagUID}`;
export const getPostLink = (postUID: string) => `/posts/${postUID}`;
export const getCategoryLink = (categoryUID: string) => `/${categoryUID}`;
