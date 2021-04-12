declare module '@common' {
	import { GetStaticPathsResult, GetStaticPropsResult } from 'next';

	type Error = {
		message: string;
	};

	type ResultError = {
		error: Error;
		data: null;
	};

	type StaticPropsError = GetStaticPropsResult<
		ResultError & { preview: boolean }
	>;

	type StaticPropsSuccess<Data, Meta = any> = GetStaticPropsResult<
		Result<Data, Meta> & { preview: boolean }
	>;
	type StaticPathError = GetStaticPathsResult<any>;

	type Meta = Record<string, any> | null;
	type Result<Data, Meta = any> = {
		error: Error | null;
		data: Data | null;
		meta?: Meta | null;
	};
}
