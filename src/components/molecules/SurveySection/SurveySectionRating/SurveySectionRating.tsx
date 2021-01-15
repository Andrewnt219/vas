import SurveySectionQuestion from '@src/components/atoms/SurveySectionQuestion/SurveySectionQuestion';
import SurveySectionRatingInput from '@src/components/atoms/SurveySectionRatingInput/SurveySectionRatingInput';
import React, { ReactElement } from 'react';
import { styled } from 'twin.macro';

type Props = {
	data: {
		question: string;
		ratingSystem?: RatingSystem;
	};
};

function SurveySectionRating({ data }: Props): ReactElement {
	const { question, ratingSystem } = data;

	return (
		<Container>
			<SurveySectionQuestion>{question}</SurveySectionQuestion>
			{renderSurveySectionRatingInputs(ratingSystem)}
		</Container>
	);
}

type RatingSystem = {
	min?: number;
	max?: number;
	step?: number;
};

function renderSurveySectionRatingInputs(
	ratingSystem?: RatingSystem
): ReactElement[] {
	const { min = 1, max = 10, step = 1 } = ratingSystem || {};

	const renderedRatingInputs: ReactElement[] = [];

	for (let i = min; i <= max; i += step) {
		renderedRatingInputs.push(
			<SurveySectionRatingInput key={i} data={{ number: i }} />
		);
	}

	return renderedRatingInputs;
}
type ContainerProps = {};
const Container = styled.div<ContainerProps>``;

export default SurveySectionRating;
