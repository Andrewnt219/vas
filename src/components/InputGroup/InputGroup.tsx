import { InputLabel } from '@components/InputLabel/InputLabel';
import TextField from '@components/TextField/TextField';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import type {
	FieldError,
	FieldValues,
	RefCallbackHandler,
} from 'react-hook-form';
import tw, { css, styled } from 'twin.macro';

export type InputGroupProps<T extends FieldValues> = {
	data: {
		error?: FieldError;
		register: RefCallbackHandler;
		labelText: string;
	};
	isTextArea?: boolean;
	className?: string;
};

function InputGroup<T extends FieldValues>({
	className,
	data,
	isTextArea,
}: InputGroupProps<T>) {
	const { labelText, register, error } = data;

	return (
		<Container className={className} tw="" isInvalid={!!error?.message}>
			<InputLabel htmlFor={register.name}>{labelText}</InputLabel>

			<TextField as={isTextArea ? 'textarea' : 'input'} {...register} />

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

	${TextField} {
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
