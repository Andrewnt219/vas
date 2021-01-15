import Image from 'next/image';
import React, { ReactElement, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	data: {
		mainText: ReactNode;
		subText: ReactNode;
		semesterText: ReactNode;
	};

	children?: never;
};

function SurveyPageHero({ data }: Props): ReactElement {
	const { mainText, subText, semesterText } = data;

	return (
		<Section>
			<Header>
				<SemesterText>{semesterText}</SemesterText>
				<LogosContainer>
					<LogoContainer>
						<Image
							width={600}
							height={360}
							src="/images/survey-siv-logo.png"
							alt="a maple leaf icon with side text Seneca International Vietnam"
						/>
					</LogoContainer>

					<LogoContainer>
						<Image
							width={1582}
							height={2048}
							src="/images/survey-vas-logo.png"
							alt="text says VAS Vietnamese Association at Seneca College"
						/>
					</LogoContainer>
				</LogosContainer>
			</Header>
			<Main>
				<Heading>{mainText}</Heading>
				<Subheading>{subText}</Subheading>
			</Main>
		</Section>
	);
}

type SectionProps = {};
const Section = styled.section<SectionProps>`
	${tw`text-white bg-primary px-11 pt-10 pb-28`}
`;

type HeaderProps = {};
const Header = styled.header<HeaderProps>`
	${tw`flex justify-between mb-14`}
`;

type SemesterTextProps = {};
const SemesterText = styled.span<SemesterTextProps>`
	${tw`uppercase font-bold text-5xl leading-close tracking-tighter`}
`;

type LogosContainerProps = {};
const LogosContainer = styled.div<LogosContainerProps>`
	${tw`space-x-5`}
`;

type LogoContainerProps = {};
const LogoContainer = styled.picture<LogoContainerProps>`
	img {
		${tw` w-24 h-24 object-scale-down object-center`}
	}
`;

type MainProps = {};
const Main = styled.main<MainProps>`
	${tw`text-center`}
`;

type HeadingProps = {};
const Heading = styled.h1<HeadingProps>`
	${tw`uppercase font-extrabold text-xxl text-center mb-12 leading-close tracking-tightest`}
`;

type SubheadingProps = {};
const Subheading = styled.p<SubheadingProps>`
	${tw`text-3xl font-medium tracking-tighter`}
`;

export default SurveyPageHero;
