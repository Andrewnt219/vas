import React, { ReactElement, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';
import Image from 'next/image';

type Props = {
	data: {
		mainText: ReactNode;
		subText: ReactNode;
		semesterText: ReactNode;
	};

	children?: never;
};

function SurveryHeader({ data }: Props): ReactElement {
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
	${tw` uppercase font-extrabold`}

	font-size: 2.67rem;
	line-height: 0.78125;
	letter-spacing: -0.2rem;
`;

type LogosContainerProps = {};
const LogosContainer = styled.div<LogosContainerProps>`
	${tw`space-x-5`}
`;

type LogoContainerProps = {};
const LogoContainer = styled.picture<LogoContainerProps>`
	img {
		${tw` w-24 h-24 object-scale-down object-center`}
		${tw``}
	}
`;

type MainProps = {};
const Main = styled.main<MainProps>`
	${tw`font-bold text-center`}
`;

type HeadingProps = {};
const Heading = styled.h1<HeadingProps>`
	${tw`uppercase font-black text-center mb-12`}

	line-height: 0.82;
	letter-spacing: -0.75rem;
	font-size: 8.875rem;
`;

type SubheadingProps = {};
const Subheading = styled.p<SubheadingProps>`
	${tw`text-3xl font-medium`}

	letter-spacing: -0.16rem;
`;

export default SurveryHeader;
