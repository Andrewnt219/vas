import { Hyperlink as PmHyperlink } from '@prismic-types';
import { hrefResolver, linkResolver } from '@root/prismic-configuration';
import NextLink from 'next/link';
import { ReactNode } from 'react';

/* -------------------------------- HYPERLINK ------------------------------- */
type HyperlinkProps = {
	className?: string;
	data: PmHyperlink;
	children: ReactNode;
};

export function Hyperlink({ className, data, children }: HyperlinkProps) {
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

/* -------------------------------- Headings -------------------------------- */
type HeadingProps = {
	className?: string;
	index: string;
	data: PmHyperlink;
	children: ReactNode;
};

export const Serializer = {
	Hyperlink,
};
