export const seoFields = {
	name: 'seo',
	title: 'SEO',
	type: 'seo-tools', // use seo-tools type
	options: {
		baseUrl(doc) {
			return `https://vas-canary.vercel.app/${doc._lang}/posts`;
		},
		slug(doc) {
			// (REQUIRED) a function to return the sug of the current page, which will be appended to the baseUrl
			return doc.slug.current;
		},
		fetchRemote: true, // Can be set to false to disable fetching the remote source (you will need to pass the content helpers for analysis)
		contentSelector: 'body', // (OPTIONAL) option to finetune where Yoast will look for the content. (only applicable for scraping without content function)
	},
};
