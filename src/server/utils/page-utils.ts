import { StaticPathError, StaticPropsError, StaticPropsSuccess } from '@common';

export function errorStatcPropsHandler(
	error: unknown,
	preview = false
): StaticPropsError {
	console.error(error);

	return createStaticError('Something went wrong');
}
/* -------------------------------------------------------------------------- */

export function errorStaticPathsHandler(error: unknown): StaticPathError {
	console.error(error);

	return {
		fallback: true,
		paths: [],
	};
}
/* -------------------------------------------------------------------------- */

export function createStaticError(message: string): StaticPropsError {
	return {
		props: {
			data: null,
			error: { message },
		},
		revalidate: 60,
	};
}

/* -------------------------------------------------------------------------- */

export function createStaticProps<Data>(data: Data): StaticPropsSuccess<Data> {
	return {
		props: {
			data,
			error: null,
		},
		revalidate: 60,
	};
}
