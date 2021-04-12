import { StaticPathError, StaticPropsError, StaticPropsSuccess } from '@common';

export function errorStatcPropsHandler(
	error: unknown,
	preview = false
): StaticPropsError {
	console.error(error);

	return createStaticError('Something went wrong', preview);
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

export function createStaticError(
	message: string,
	preview = false
): StaticPropsError {
	return {
		props: {
			data: null,
			error: { message },
			preview,
		},
		revalidate: 60,
	};
}

/* -------------------------------------------------------------------------- */

export function createStaticProps<Data, Meta = any>(
	data: Data,
	preview = false,
	meta?: Meta
): StaticPropsSuccess<Data, Meta> {
	return {
		props: {
			data,
			error: null,
			preview,
			meta: meta ?? null,
		},
		revalidate: 60,
	};
}
