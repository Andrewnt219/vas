import { InputLabel } from '@components/InputLabel/InputLabel';
import TextField from '@components/TextField/TextField';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import type { FieldError } from 'react-hook-form';
import tw, { css, styled } from 'twin.macro';

export type InputGroupProps = {
	error?: FieldError;
	className?: string;
	children: [ReturnType<typeof InputLabel>, ReturnType<typeof TextField>];
};

function InputGroup({ className, error, children }: InputGroupProps) {
	return (
		<Container className={className} tw="" isInvalid={!!error?.message}>
			{children}

			<AnimatePresence exitBeforeEnter>
				<motion.span
					key={error?.message}
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { type: 'tween', duration: 0.15 },
					}}
					exit={{ opacity: 0 }}
					//
					tw="text-smaller text-primary"
				>
					{error?.message}
				</motion.span>
			</AnimatePresence>
		</Container>
	);
}

const invalidCss = css`
	${TextField} {
		${tw`bg-primary bg-opacity-30`}
	}
`;

type ContainerProps = {
	isInvalid: boolean;
};
const Container = styled.div<ContainerProps>`
	${tw`flex flex-col space-y-1 md:space-y-3`}

	${(p) => p.isInvalid && invalidCss}
`;
export default InputGroup;
