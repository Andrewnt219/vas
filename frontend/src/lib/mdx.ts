import { MdxComponents } from '@components/MdxComponents';
import mdxPrism from 'mdx-prism';
import renderToString from 'next-mdx-remote/render-to-string';

export const mdx = {
	parse: (mdxContent: string) => {
		return renderToString(mdxContent, {
			components: MdxComponents,
			mdxOptions: {
				remarkPlugins: [
					require('remark-autolink-headings'),
					require('remark-slug'),
					require('remark-code-titles'),
				],
				rehypePlugins: [mdxPrism],
			},
		});
	},
};
