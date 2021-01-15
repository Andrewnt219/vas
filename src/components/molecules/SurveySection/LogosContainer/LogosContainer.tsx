import Image from 'next/image';
import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

function LogosContainer({}: Props): ReactElement {
	return (
		<Container>
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
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw`space-x-5`}
`;

type LogoContainerProps = {};
const LogoContainer = styled.picture<LogoContainerProps>`
	img {
		${tw`w-16 h-16 sm:(w-24 h-24) object-scale-down object-center`}
	}
`;

export default LogosContainer;
