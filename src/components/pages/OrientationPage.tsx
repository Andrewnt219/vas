import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';
import SurveryHeader from '../organisms/SurveyPageHero/SurveyPageHero';
import SurveyBody from '../organisms/SurveyBody/SurveyBody';

type Props = {};

function OrientationPage({}: Props): ReactElement {
	return (
		<Container>
			<SurveryHeader
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

			<SurveyBody />
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>``;

export default OrientationPage;
