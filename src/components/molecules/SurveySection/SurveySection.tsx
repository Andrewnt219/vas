import React, { ReactElement, ReactNode } from 'react';
import { styled } from 'twin.macro';

type Props = {
	children: ReactNode;
};

function SurveySection({ children }: Props): ReactElement {
	return <Container>{children}</Container>;
}

type ContainerProps = {};
const Container = styled.section<ContainerProps>``;

export default SurveySection;
