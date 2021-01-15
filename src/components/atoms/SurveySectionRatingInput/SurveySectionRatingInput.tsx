import React, { InputHTMLAttributes, ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	data: Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'type' | 'hidden' | 'value'
	> & {
		number: number;
		name: string;
	};
	inputRef:
		| ((instance: HTMLInputElement | null) => void)
		| React.RefObject<HTMLInputElement>
		| null
		| undefined;
};

function SurveySectionRatingInput({ data, inputRef }: Props): ReactElement {
	const { number, ...inputProps } = data;

	return (
		<Label>
			{number}
			<RadioInput
				type="radio"
				value={number}
				hidden
				ref={inputRef}
				{...inputProps}
			/>
			<FakeInput />
		</Label>
	);
}

type FakeInputProps = {};
const FakeInput = styled.span<FakeInputProps>`
	${tw`border-red-500 border-2 rounded-full`}
	${tw`mt-3`}
	${tw`relative`}
	width: 1em;
	height: 1em;
`;

type RadioInputProps = {};
const RadioInput = styled.input<RadioInputProps>``;

type LabelProps = {};
const Label = styled.label<LabelProps>`
	${tw`flex flex-col items-center`}

	${RadioInput}:checked + ${FakeInput}::before {
		${tw`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
		${tw` w-2/3 h-2/3 bg-red-500 rounded-full`}
		content: "";
	}
`;

export default SurveySectionRatingInput;
