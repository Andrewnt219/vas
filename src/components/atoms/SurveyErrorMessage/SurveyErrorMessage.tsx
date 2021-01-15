import { motion, Variants } from 'framer-motion';
import React, { ReactElement, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	children: ReactNode;
};

function SurveyErrorMessage({ children }: Props): ReactElement {
	return (
		<Text
			variants={textVariants}
			animate="visible"
			initial="hidden"
			exit="hidden"
		>
			{children}
		</Text>
	);
}

const textVariants: Variants = {
	hidden: {
		opacity: 0,
		y: '100%',
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			damping: 8,
		},
	},
};
type TextProps = {};
const Text = styled(motion.p)<TextProps>`
	${tw`bg-red-200 text-white font-medium py-1 px-2 w-max`}
	font-size: smaller;
`;

export default SurveyErrorMessage;
