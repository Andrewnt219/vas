import SurveyRadioInput from '@components/atoms/SurveyRadioInput/SurveyRadioInput';
import SurveyErrorMessage from '@src/components/atoms/SurveyErrorMessage/SurveyErrorMessage';
import { AnimatePresence } from 'framer-motion';
import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';
type Props = {
	data: {
		inputsProps: {
			value: string;
			label: string;
		}[];

		name: string;
		errorMessage?: string;
	};
	inputRef:
		| ((instance: HTMLInputElement | null) => void)
		| React.RefObject<HTMLInputElement>
		| null
		| undefined;
};

function SurveyRadioGroup({ data, inputRef }: Props): ReactElement {
	const { inputsProps, name, errorMessage } = data;

	return (
		<AnimatePresence>
			{errorMessage && (
				<SurveyErrorMessage key={name}>{errorMessage}</SurveyErrorMessage>
			)}
			<Container>
				{inputsProps.map((props) => (
					<SurveyRadioInput
						key={props.value}
						data={{ label: props.label, name: name }}
						inputRef={inputRef}
					/>
				))}
			</Container>
		</AnimatePresence>
	);
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw`space-y-5`}
`;

export default SurveyRadioGroup;
