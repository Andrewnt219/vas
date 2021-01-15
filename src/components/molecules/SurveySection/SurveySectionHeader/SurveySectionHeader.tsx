import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
	data: {
		heading: string;
		descriptions: string[];
	};
};

function SurveySectionHeader({ data }: Props): ReactElement {
	const { descriptions, heading } = data;

	return (
		<Header>
			<Heading>{heading}</Heading>

			<DescriptionContainer>
				{descriptions.map((description, index) => (
					<Description key={index}>{description}</Description>
				))}
			</DescriptionContainer>
		</Header>
	);
}

type HeaderProps = {};
const Header = styled.header<HeaderProps>`
	${tw`text-center   `}
	${tw`pt-7 pb-10 px-16 rounded-survey space-y-4 border-4 border-red-100 mb-14`}
`;

type HeadingProps = {};
const Heading = styled.h2<HeadingProps>`
	${tw`font-bold`}
`;

type DescriptionContainerProps = {};
const DescriptionContainer = styled.div<DescriptionContainerProps>`
	${tw`space-y-3 italic`}
`;

type DescriptionProps = {};
const Description = styled.p<DescriptionProps>``;

export default SurveySectionHeader;
