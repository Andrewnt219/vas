import { Hyperlink } from '@prismic-types';
import { hrefResolver, linkResolver } from '@root/prismic-configuration';
import NextLink from 'next/link';
import { ReactNode } from 'react';
type HyperlinkProps = {
	className?: string;
	data: Hyperlink;
	children: ReactNode;
};

function HyperlinkSerializer({ className, data, children }: HyperlinkProps) {
	if (data.link_type === 'Document') {
		return (
			<NextLink href={hrefResolver(data)} as={linkResolver(data)} passHref>
				<a className={className}>{children}</a>
			</NextLink>
		);
	}

	return (
		<a
			href={data.url}
			target="_blank"
			rel="noopener noreferrer"
			className={className}
			tw=""
		>
			{children}
		</a>
	);
}

export default HyperlinkSerializer;
