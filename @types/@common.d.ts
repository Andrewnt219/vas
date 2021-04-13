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

	type StaticPropsSuccess<Data> = GetStaticPropsResult<
		Result<Data> & { preview: boolean }
	>;
	type StaticPathError = GetStaticPathsResult<any>;

	type Meta = Record<string, any> | null;
	type Result<Data> = {
		error: Error | null;
		data: Data | null;
	};
}
