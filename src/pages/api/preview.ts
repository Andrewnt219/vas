import { Result } from '@common';
import { Client, linkResolver } from '@root/prismic-configuration';
import { createResultError } from '@utils/create-utils';
import { isNullOrUndefined } from '@utils/validate-utils';
import { NextApiRequest, NextApiResponse } from 'next';

const preview = async (
	req: NextApiRequest,
	res: NextApiResponse<Result<void>>
) => {
	const { query } = req;

	if (!isValidQuery(query)) {
		return res
			.status(400)
			.json(createResultError('Invalid token or documentId'));
	}

	const { token: ref, documentId } = query;

	const redirectUrl = await Client(req)
		.getPreviewResolver(ref, documentId)
		.resolve(linkResolver, '/');

	if (!redirectUrl) {
		return res.status(401).json(createResultError('Invalid token'));
	}

	res.setPreviewData({ ref });

	// Redirect the user to the share endpoint from same origin. This is
	// necessary due to a Chrome bug:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=696204
	res.write(
		`<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${redirectUrl}" />
    <script>window.location.href = '${redirectUrl}'</script>
    </head>`
	);

	res.end();
};

type ValidQuery = {
	token: string;
	documentId: string;
};

function isValidQuery(query: NextApiRequest['query']): query is ValidQuery {
	const { token: ref, documentId } = query;

	return (
		!isNullOrUndefined(ref) &&
		!Array.isArray(ref) &&
		!isNullOrUndefined(documentId)
	);
}

export default preview;
