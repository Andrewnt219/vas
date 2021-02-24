import React, { ReactNode, VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	children: ReactNode;
};

const SectionH1: VFC<Props> = ({ children }) => {
	return <Heading>{children}</Heading>;
};

type HeadingProps = {};
const Heading = styled.h1<HeadingProps>`
	${tw`relative text-5xl pb-8 mx-auto max-w-max`}

	::after {
		content: '';
		${tw`block absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1/3 bg-primary`}
	}
`;
export default SectionH1;
