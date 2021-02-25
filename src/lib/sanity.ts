import initSanityClient from '@sanity/client';

/**
 * @description configured client for Sanity
 */
export const sanityClient = initSanityClient({
	projectId: 'gafowzn5',
	dataset: 'production',
	useCdn: true,
});
