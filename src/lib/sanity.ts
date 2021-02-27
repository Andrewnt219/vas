import initSanityClient from '@sanity/client';

/**
 * @description configured client for Sanity
 */
export const sanityClient = initSanityClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_CLIENT_ID as string,
	dataset: 'production',
	useCdn: true,
});

export const localizedSanityClient = initSanityClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_CLIENT_ID as string,
	dataset: 'production',
	token: process.env.SANITY_READ_TOKEN,
});
