import { ResultError } from '@common';
import { Language } from '@data/localization-data';
import { createResultError } from '@utils/create-utils';
import { tryParseLocale } from '@utils/validate-utils';
import cookie from 'cookie';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { Handler, isValidHttpMethod } from './validate-utils';

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

/* -------------------------------------------------------------------------- */
export function errorHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  error: unknown
) {
  console.log(error);

  const response: ResultError = createResultError('Something went wrong');

  if (error instanceof Error) {
    response.error = error;
  }

  return res.status(500).json(response);
}

/* -------------------------------------------------------------------------- */
export function getLocaleCookie(req: NextApiRequest): Language {
  const { NEXT_LOCALE } = cookie.parse(req.headers.cookie ?? '');

  return tryParseLocale(NEXT_LOCALE);
}

/* -------------------------------------------------------------------------- */
/**
 * Wrap handler in try catch and check if the incoming request is allowed. I'm proud of this.
 *
 * @example
 * const get:NextApiHandler<Result<string>> = (req, res) => {...}
 * export default apiHandler({ get });
 */
export const apiHanler =
  (supportedHandlers: Partial<Record<Handler, NextApiHandler>>) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const method = req.method?.toLowerCase();
      if (!isValidHttpMethod(method)) {
        return res
          .status(400)
          .json(createResultError('Unexpected HTTP method'));
      }

      const handler = supportedHandlers[method];
      if (!handler) {
        return res.status(405).json(createResultError('Method Not Allowed'));
      }

      return handler(req, res);
    } catch (error) {
      return errorHandler(req, res, error);
    }
  };
