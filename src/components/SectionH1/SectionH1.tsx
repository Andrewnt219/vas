import React, { ReactNode, VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	children: ReactNode;
};

/**
 * @description renders a styled header for a section
 */
const SectionH1: VFC<Props> = ({ children }) => {
	return <Heading>{children}</Heading>;
};

type HeadingProps = {};
const Heading = styled.h1<HeadingProps>`
	${tw`text-2xl md:text-4xl mx-auto max-w-max relative pb-2 md:pb-4`}
	${tw`lg:(text-5xl pb-8)`}

	::after {
		content: '';
		${tw`block absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px w-1/3 bg-primary md:h-1`}
	}
`;
export default SectionH1;
