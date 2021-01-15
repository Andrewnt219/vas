import React, { ReactElement } from 'react';
import { styled } from 'twin.macro';

type Props = {
	data: {
		number: number;
	};
};

function SurveySectionRatingInput({ data }: Props): ReactElement {
	const { number } = data;

	return <Container>{number}</Container>;
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>``;

export default SurveySectionRatingInput;
