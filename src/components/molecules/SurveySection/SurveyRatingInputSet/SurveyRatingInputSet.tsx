import SurveyErrorMessage from '@src/components/atoms/SurveyErrorMessage/SurveyErrorMessage';
import SurveySectionRatingInput from '@src/components/atoms/SurveySectionRatingInput/SurveySectionRatingInput';
import { AnimatePresence } from 'framer-motion';
import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	data: { ratingSystem: Arguments['ratingSystem']; errorMessage?: string };
	inputRef: Arguments['inputRef'];
};

function SurveyRatingInputSet({ data, inputRef }: Props): ReactElement {
	const { ratingSystem, errorMessage } = data;
	return (
		<AnimatePresence>
			{errorMessage && (
				<SurveyErrorMessage key={ratingSystem.inputName}>
					{errorMessage}
				</SurveyErrorMessage>
			)}
			<RatingInputSet>
				{renderSurveySectionRatingInputs({ ratingSystem, inputRef })}
			</RatingInputSet>
		</AnimatePresence>
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
type RatingInputSetProps = {};
const RatingInputSet = styled.div<RatingInputSetProps>`
	${tw`flex justify-between `}
`;

export default SurveyRatingInputSet;
