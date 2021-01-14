import SurveySection from '@src/components/molecules/SurveySection/SurveySection';
import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

function SurveyBody({}: Props): ReactElement {
	return (
		<Container>
			<header>
				<FormTitle>
					Feedback
					<br />
					Virtual Orientation
					<br />
					Winter 2021
				</FormTitle>
			</header>

			<main>
				<SurveySection />
			</main>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.section<ContainerProps>`
	${tw`text-red-200 font-medium`}
`;

type FormTitleProps = {};
const FormTitle = styled.h1<FormTitleProps>``;

export default SurveyBody;
