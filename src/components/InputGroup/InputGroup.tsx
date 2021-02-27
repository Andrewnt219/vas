import { InputLabel } from '@components/InputLabel/InputLabel';
import TextField from '@components/TextField/TextField';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import type { FieldError, FieldValues } from 'react-hook-form';
import tw, { css, styled } from 'twin.macro';

type InputRef =
	| ((instance: HTMLInputElement | null) => void)
	| React.RefObject<HTMLInputElement>
	| null
	| undefined;

export type InputGroupProps<T extends FieldValues> = {
	data: {
		error?: FieldError;
		register: InputRef;
		labelText: string;
		name: string & keyof T; // smartass TypeScript cannot interfere key is string
	};

	className?: string;
};

function InputGroup<T extends FieldValues>({
	className,
	data,
}: InputGroupProps<T>) {
	const { labelText, name, register, error } = data;

	return (
		<Container className={className} tw="" isInvalid={!!error?.message}>
			<InputLabel htmlFor={name}>{labelText}</InputLabel>

			<TextField name={name} ref={register} />

			<AnimatePresence exitBeforeEnter>
				<motion.span
					key={error?.message}
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { type: 'tween', duration: 0.15 },
					}}
					exit={{ opacity: 0 }}
				>
					{error?.message}
				</motion.span>
			</AnimatePresence>
		</Container>
	);
}

const invalidCss = css`
	${InputLabel} {
		color: blue;
		text-decoration: underline;
	}

	// Cannot use TextField directly for some reason
	input {
		${tw`bg-primary bg-opacity-30`}
	}
`;

type ContainerProps = {
	isInvalid: boolean;
};
const Container = styled.div<ContainerProps>`
	${tw``}

	&:focus-within {
		${InputLabel} {
			color: red;
		}
	}

	${(p) => p.isInvalid && invalidCss}
`;
export default InputGroup;
