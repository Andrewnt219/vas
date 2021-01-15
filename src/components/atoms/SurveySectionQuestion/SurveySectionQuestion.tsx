import React, { ReactElement, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	children: ReactNode;
};

function SurveySectionQuestion({ children }: Props): ReactElement {
	return <Text>{children}</Text>;
}

type TextProps = {};
const Text = styled.p<TextProps>`
	${tw``}
`;

export default SurveySectionQuestion;
