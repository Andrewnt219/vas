import { StaticPathError, StaticPropsError, StaticPropsSuccess } from '@common';
import { createResult, createResultError } from '@utils/create-utils';

export function errorStatcPropsHandler(error: unknown): StaticPropsError {
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
		props: createResultError(message),
		revalidate: 60,
	};
}

/* -------------------------------------------------------------------------- */

export function createStaticProps<Data>(data: Data): StaticPropsSuccess<Data> {
	return {
		props: createResult(data),
		revalidate: 60,
	};
}
