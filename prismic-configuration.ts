import { LinkedItem } from '@prismic-types';
import Prismic from '@prismicio/client';
import { NextApiRequest } from 'next';

export const apiEndpoint = 'https://vasseneca.cdn.prismic.io/api/v2';
export const accessToken = process.env.PRISMIC_VAS_ACCESS_TOKEN;

const createClientOptions = (
	req: NextApiRequest | null = null,
	prismicAccessToken: string | null = null
) => {
	const reqOption = req ? { req } : {};
	const accessTokenOption = prismicAccessToken
		? { accessToken: prismicAccessToken }
		: {};
	return {
		...reqOption,
		...accessTokenOption,
	};
};

export const Client = (req: NextApiRequest) =>
	Prismic.client(apiEndpoint, createClientOptions(req, accessToken));

export const PMclient = Prismic.client(
	apiEndpoint,
	createClientOptions(null, accessToken)
);

export const linkResolver = (doc: LinkedItem) => {
	switch (doc.type) {
		case 'page':
			return `/${doc.lang}/${doc.uid}`;

		case 'post':
			return `/${doc.lang}/posts/${doc.uid}`;

		case 'category':
			return `/${doc.lang}/categories/${doc.uid}`;

		default:
			return `/${doc.lang}`;
	}
};

// Additional helper function for Next/Link component
export const hrefResolver = (doc: LinkedItem) => {
	switch (doc.type) {
		case 'post':
			return `/posts/[uid]`;

		case 'category':
			return `/categories/[uid]`;

		default:
			return '/';
	}
};
