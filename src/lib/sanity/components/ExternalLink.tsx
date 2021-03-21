import NextLink from 'next/link';
import React, { AnchorHTMLAttributes, ReactElement, ReactNode } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import tw, { css, styled, theme } from 'twin.macro';
import { StyledInternalLink } from './InternalLink';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	children: ReactNode;
	mark: {
		href: string;
	};
};

function ExternalLink({ children, mark, ...anchorProps }: Props): ReactElement {
	return (
		<NextLink href={mark.href} passHref>
			<CustomInternalLink
				{...anchorProps}
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
				<FaExternalLinkAlt />
			</CustomInternalLink>
		</NextLink>
	);
}

// Thank for being weird TypeScript, error if put in directly with theme``
// And then, tw`` doesn't work, only happens with :visit
const visitedCss = css`
	&:visited {
		color: ${theme`colors.gray.200`};

		svg {
			color: ${theme`colors.gray.200`};
		}
	}
`;

const CustomInternalLink = styled(StyledInternalLink)`
	${tw`svg:(transition-all ease-linear text-primary ml-2 text-smaller)`}
	${tw`inline-flex items-center cursor-pointer`}
	
	&:hover,
	&:focus,
	&:visited:hover,
	&:visited:focus {
		${tw`text-primary`}
		${tw`svg:(transform text-primary scale-125)`}
	}

	${visitedCss}
`;

export default ExternalLink;
