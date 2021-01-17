import SurveyButton from '@src/components/atoms/SurveyButton/SurveyButton';
import SurveySemesterText from '@src/components/atoms/SurveySemesterText/SurveySemesterText';
import LogosContainer from '@src/components/molecules/SurveySection/LogosContainer/LogosContainer';
import storage from '@src/lib/firebase/storage';
import { motion, Variants } from 'framer-motion';
import React, { ReactElement, useEffect, useState } from 'react';
import tw, { styled, theme } from 'twin.macro';

type Props = {};

function SurveyThankYou({}: Props): ReactElement {
	const [downloadUrl, setDownloadUrl] = useState<string>();

	useEffect(() => {
		storage
			.refFromURL(
				'gs://vas-seneca.appspot.com/winter-orientation-2021-summary.pdf'
			)
			.getDownloadURL()
			.then((url) => setDownloadUrl(url))
			.catch((err) => console.error(err));
	}, []);

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
				<MainText>Cảm ơn các bạn</MainText>
				<SubText>
					đã dành thời gian điền khảo sát về buổi Orientation 2021 kỳ mùa Đông
					vừa qua. Tụi mình xin dành tặng các bạn <span>summary</span> các điểm
					nổi bật từ buổi Orientation.
				</SubText>

				<SubText2>
					Chúc các bạn có một kỳ học thành công tại Seneca và nhớ theo dõi các
					dự án siêu thú vị sắp đến từ VAS nhé!
				</SubText2>

				{!downloadUrl ? (
					<SurveyButton disabled>Fetching file</SurveyButton>
				) : (
					<SurveyButton
						as="a"
						download
						href={downloadUrl}
						style={{ fontWeight: 500 }}
					>
						Summary
					</SurveyButton>
				)}
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
	${tw`min-h-screen pb-10`}
`;
type HeaderProps = {};
const Header = styled.header<HeaderProps>`
	${tw`px-11 py-10`}
	${tw`bg-red-400 text-white`}
	${tw`flex justify-between`}
`;

type MainProps = {};
const Main = styled.main<MainProps>`
	${tw`mt-20 space-y-5 flex flex-col items-center pb-5`}
	padding: 0 5%;

	@media screen and (min-width: ${theme`screens.sm`}) {
		padding: 0 20%;
	}

	button,
	a {
		${tw`block mt-10! `}
	}
`;

type MainTextProps = {};
const MainText = styled.h1<MainTextProps>`
	${tw`text-4xl  text-red-400 font-medium text-center`}
`;

type SubTextProps = {};
const SubText = styled.p<SubTextProps>`
	${tw`text-xl leading-none text-red-400 font-normal text-center italic`}

	span {
		${tw`underline`}
	}
`;

type SubText2Props = {};
const SubText2 = styled.p<SubText2Props>`
	${tw`text-xl leading-none text-red-400 text-center mt-10! font-medium `}
	padding: 0 10%;

	@media screen and (min-width: ${theme`screens.sm`}) {
		padding: 0 15%;
	}

	span {
		${tw`underline`}
	}
`;

export default SurveyThankYou;
