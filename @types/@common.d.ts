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

	type StaticPathError = GetStaticPathsResult<any>;

	type Result<Data, Meta = {}> = {
		error: Error | null;
		data: Data | null;
		meta?: Meta;
	};
}
