import { InputLabel } from '@components/InputLabel/InputLabel';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import type { FieldError } from 'react-hook-form';
import tw, { styled } from 'twin.macro';

type Props = {
	className?: string;
	// only expect a label and an input
	children: [ReactElement, ReactElement];

	error?: FieldError;
};

function FormGroup({ className, children, error }: Props) {
	return (
		<Container className={className} tw="">
			{children}
			<AnimatePresence exitBeforeEnter>
				<motion.span
					key={error?.message}
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { type: 'tween', duration: 0.1 },
					}}
					exit={{ opacity: 0 }}
				>
					{error?.message}
				</motion.span>
			</AnimatePresence>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw``}

	&:focus-within ${InputLabel} {
		color: red;
	}
`;

export default FormGroup;
