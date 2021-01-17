import React, { ReactElement, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	children: ReactNode;
};

function SurveySection({ children }: Props): ReactElement {
	return <Container>{children}</Container>;
}

type ContainerProps = {};
const Container = styled.section<ContainerProps>`
	${tw`space-y-16 text-xl  tracking-tighter leading-tight font-semibold`}

	label {
		${tw`font-normal`}
	}
`;

export default SurveySection;
