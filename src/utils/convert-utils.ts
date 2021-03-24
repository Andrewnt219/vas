import { Response } from '@api-response';
import { AxiosError } from 'axios';

export function getErrorMessage(error: AxiosError<Response<any>>): string {
	return error.response?.data.error?.message ?? error.message;
}
