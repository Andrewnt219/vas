import Link from 'next/link';
import React, { AnchorHTMLAttributes, ReactElement, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	children: ReactNode;
	mark: {
		url: string;
	};
};

function InternalLink({ children, mark, ...anchorProps }: Props): ReactElement {
	return (
		<Link href={mark.url} passHref>
			<StyledInternalLink {...anchorProps}>{children}</StyledInternalLink>
		</Link>
	);
}

// TODO this also need to go to the correct controller
type StyledInternalLinkProps = {};
export const StyledInternalLink = styled.a<StyledInternalLinkProps>`
	${tw`underline transition-colors decorator-primary`}

	:visited {
		${tw` text-gray-200 decorator-current`}
	}

	// NOTE must be after :visited
	${tw`hocus:text-primary`}
`;

export default InternalLink;
