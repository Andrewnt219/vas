import { AnchorHTMLAttributes, ReactNode, VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
	className?: string;
	children: ReactNode;
};

//TODO responsive
/**
 * @description renders a link with svg icon
 */
const MediaIconAnchor: VFC<Props> = ({
	className,
	children,
	...anchorProps
}) => {
	return (
		<StyledAnchor className={className} {...anchorProps}>
			{children}
		</StyledAnchor>
	);
};

type StyledAnchorProps = {};
const StyledAnchor = styled.a<StyledAnchorProps>`
	svg {
		width: 2em;
		height: 2em;
		${tw`fill-current text-white transition-transform `}
	}

	:hover,
	:focus {
		${tw`outline-none`}

		svg {
			${tw`transform scale-125`}
		}
	}
`;

export default MediaIconAnchor;
