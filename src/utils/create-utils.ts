import { Result } from '@common';

export const createResultError = <T = any>(
	message: string,
	initialData?: T
): Result<T> => {
	return {
		data: initialData ?? null,
		error: { message },
	};
};

export const createResultPending = <T = any>(initialData?: T): Result<T> => {
	return {
		data: initialData ?? null,
		error: null,
	};
};

export const createResult = <T = any>(data: T): Result<T> => {
	return {
		data: data,
		error: null,
	};
};
