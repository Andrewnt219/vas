import SurveySemesterText from '@src/components/atoms/SurveySemesterText/SurveySemesterText';
import LogosContainer from '@src/components/molecules/SurveySection/LogosContainer/LogosContainer';
import { motion, Variants } from 'framer-motion';
import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

function SurveyThankYou({}: Props): ReactElement {
	return (
		<Container
			variants={containerVariants}
			animate="visible"
			initial="hidden"
			exit="hidden"
		>
			<Header>
				<SurveySemesterText>
					WINTER
					<br />
					ORIENTATION
					<br />
					2021
				</SurveySemesterText>
				<LogosContainer />
			</Header>
			<Main>
				<MainText>Thank you for your feedback &#59;&#41;</MainText>
			</Main>
		</Container>
	);
}

const containerVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0,
		y: '100%',
	},
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			type: 'tween',
			ease: 'easeIn',
		},
	},
};

type ContainerProps = {};
const Container = styled(motion.section)<ContainerProps>`
	${tw`h-screen`}
`;
type HeaderProps = {};
const Header = styled.header<HeaderProps>`
	${tw`px-11 py-10`}
	${tw`bg-red-400 text-white`}
	${tw`flex justify-between`}
`;

type MainProps = {};
const Main = styled.main<MainProps>`
	${tw`mt-20`}
`;

type MainTextProps = {};
const MainText = styled.h1<MainTextProps>`
	${tw`text-4xl leading-close tracking-tightest text-red-400 font-medium text-center`}
`;

export default SurveyThankYou;
