import { Error, Response } from '@api-response';
import { AxiosError } from 'axios';

export function toError(error: AxiosError<Response<any>>): Error {
	return { message: error.response?.data.error?.message ?? error.message };
}
