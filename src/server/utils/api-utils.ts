import { ErrorResponse } from '@api-response';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export function runMiddleware(
	req: NextApiRequest,
	res: NextApiResponse,
	fn: any
) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: unknown) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

export function errorHandler(
	req: NextApiRequest,
	res: NextApiResponse,
	error: unknown
) {
	console.log(error);

	const response: ErrorResponse = {
		data: null,
		error: { message: 'Something went wrong' },
	};

	return res.status(500).json(response);
}

export function getLocaleCookie(req: NextApiRequest): string {
	const { NEXT_LOCALE } = cookie.parse(req.headers.cookie ?? '');

	return NEXT_LOCALE ?? '';
}
