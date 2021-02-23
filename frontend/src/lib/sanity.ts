
import initSanityClient from '@sanity/client';
export const sanityClient = initSanityClient({
	projectId: 'gafowzn5',
	dataset: 'production',
	useCdn: true,
});
