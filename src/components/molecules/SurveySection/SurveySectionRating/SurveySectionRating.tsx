import SurveySectionQuestion from '@src/components/atoms/SurveySectionQuestion/SurveySectionQuestion';
import SurveySectionRatingInput from '@src/components/atoms/SurveySectionRatingInput/SurveySectionRatingInput';
import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	data: {
		question: string;
		ratingSystem: Arguments['ratingSystem'];
	};
	inputRef: Arguments['inputRef'];
};

function SurveySectionRating({ data, inputRef }: Props): ReactElement {
	const { question, ratingSystem } = data;

	return (
		<Container>
			<SurveySectionQuestion>{question}</SurveySectionQuestion>

			<RatingInputSet>
				{renderSurveySectionRatingInputs({ ratingSystem, inputRef })}
			</RatingInputSet>
		</Container>
	);
}

type Arguments = {
	ratingSystem: {
		min?: number;
		max?: number;
		step?: number;
		inputName: string;
	};
	inputRef:
		| ((instance: HTMLInputElement | null) => void)
		| React.RefObject<HTMLInputElement>
		| null
		| undefined;
};

function renderSurveySectionRatingInputs({
	ratingSystem,
	inputRef,
}: Arguments): ReactElement[] {
	const { min = 1, max = 10, step = 1, inputName } = ratingSystem;

	const renderedRatingInputs: ReactElement[] = [];

	for (let i = min; i <= max; i += step) {
		renderedRatingInputs.push(
			<SurveySectionRatingInput
				inputRef={inputRef}
				key={i}
				data={{ number: i, name: inputName }}
			/>
		);
	}

	return renderedRatingInputs;
}
type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw`px-20 space-y-10`}
`;

type RatingInputSetProps = {};
const RatingInputSet = styled.div<RatingInputSetProps>`
	${tw`flex justify-between px-4`}
`;

export default SurveySectionRating;
