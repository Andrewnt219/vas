declare module 'api-response' {
	type Error = {
		message: string;
	};

	type Response<T extends string> = {
		error: Error | null;
		data: T | null;
	};
}
