import React, { ReactElement, useState } from 'react';
import { styled } from 'twin.macro';
import SurveyPageBody from '../organisms/SurveyPageBody/SurveyPageBody';
import SurveyPageHero from '../organisms/SurveyPageHero/SurveyPageHero';
import SurveyThankYou from '../organisms/SurveyThankYou/SurveyThankYou';

type Props = {};

function OrientationPage({}: Props): ReactElement {
	const [submitted, setSubmitted] = useState(false);

	return (
		<Container>
			{submitted ? (
				<SurveyThankYou />
			) : (
				<>
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
					<SurveyPageBody onFormSubmitted={() => setSubmitted(true)} />
				</>
			)}
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.section<ContainerProps>``;

export default OrientationPage;
