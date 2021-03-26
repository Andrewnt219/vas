import { Result } from '@api-response';
import { AxiosError } from 'axios';

export function getErrorMessage(error?: AxiosError<Result<any>>): string {
	if (!error) {
		return 'Something went wrong';
	}

	return error.response?.data.error?.message ?? error.message;
}
