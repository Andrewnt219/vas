declare module '@common' {
	import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

	type Error = {
		message: string;
	};

	type ResultError<D = null> = {
		type: 'error';
		error: Error;
		data: D | null;
	};

	type ResultSuccess<D> = {
		type: 'success';
		error: null;
		data: D;
	};

	type ResultPending<D = null> = {
		type: 'pending';
		error: null;
		data: D | null;
	};

	type StaticPropsError = GetStaticPropsResult<ResultError>;

	type StaticPropsSuccess<Data> = GetStaticPropsResult<ResultSuccess<Data>>;
	type StaticPathError = GetStaticPathsResult<any>;

	type Meta = Record<string, any> | null;
	type Result<D> = ResultError<D> | ResultSuccess<D> | ResultPending<D>;
}
