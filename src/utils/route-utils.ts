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
