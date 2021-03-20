import React, { AnchorHTMLAttributes, ReactElement, ReactNode } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import tw, { styled } from 'twin.macro';
import { StyledInternalLink } from './InternalLink';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	children: ReactNode;
	blank?: boolean;
};

function ExternalLink({
	children,
	blank,
	...anchorProps
}: Props): ReactElement {
	const renderedContent = (
		<>
			{children} <FaExternalLinkAlt />
		</>
	);

	if (blank)
		return (
			<CustomLink
				{...{ ...anchorProps, target: '_blank', rel: 'noopener noreferrer' }}
			>
				{renderedContent}
			</CustomLink>
		);

	return <CustomLink {...anchorProps}>{renderedContent}</CustomLink>;
}

const CustomLink = styled(StyledInternalLink)`
	${tw`inline-flex items-center cursor-pointer`}

	:hover, :focus {
		svg {
			${tw`text-primary`}
		}
	}

	svg {
		transition: color 200ms ease;
		${tw`text-primary text-opacity-80 ml-1`}
		font-size: smaller;
	}
`;

export default ExternalLink;
