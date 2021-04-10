import { StaticPathError, StaticPropsError } from '@api-response';

export function errorStatcPropsHandler(
	error: unknown,
	preview = false
): StaticPropsError {
	console.error(error);

	return {
		props: {
			data: null,
			preview,
			error: { message: 'Something went wrong' },
		},
		revalidate: 60,
	};
}

export function errorStaticPathsHandler(error: unknown): StaticPathError {
	console.error(error);

	return {
		fallback: true,
		paths: [],
	};
}
