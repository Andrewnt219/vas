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
	${tw`border-current border-2 rounded-full`}
	${tw`mt-3 font-semibold! `}
	${tw`relative`}
	
	width: 1em;
	height: 1em;

	::before {
		${tw`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
		${tw` w-2/3 h-2/3 bg-current rounded-full`}
		${tw`transform scale-0 origin-center transition-all`}
		content: "";
	}
`;

type RadioInputProps = {};
const RadioInput = styled.input<RadioInputProps>``;

type LabelProps = {};
const Label = styled.label<LabelProps>`
	${tw`flex flex-col items-center cursor-pointer`}

	:hover ${FakeInput}::before {
		${tw`transform scale-75 -translate-x-1/2 -translate-y-1/2 opacity-25`}
	}

	${RadioInput}:checked + ${FakeInput}::before {
		${tw`transform scale-100 -translate-x-1/2 -translate-y-1/2 opacity-100`}
	}
`;

export default SurveySectionRatingInput;
