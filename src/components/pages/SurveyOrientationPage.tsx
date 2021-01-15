import React, { ReactElement } from 'react';
import { styled } from 'twin.macro';
import SurveyPageBody from '../organisms/SurveyPageBody/SurveyPageBody';
import SurveyPageHero from '../organisms/SurveyPageHero/SurveyPageHero';

type Props = {};

function OrientationPage({}: Props): ReactElement {
	return (
		<Container>
			<SurveyPageHero
				data={{
					mainText: (
						<>
							challenge
							<br />
							accepted
						</>
					),
					subText: 'Being successful in your first semester at Seneca',
					semesterText: (
						<>
							WINTER <br />
							ORIENTATION <br />
							2021
						</>
					),
				}}
			/>

			<SurveyPageBody />
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>``;

export default OrientationPage;
