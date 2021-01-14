import SurveySectionHeader from '@src/components/atoms/SurveySectionHeader/SurveySectionHeader';
import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

function SurveySection({}: Props): ReactElement {
	return (
		<Container>
			<SurveySectionHeader />
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.section<ContainerProps>``;

export default SurveySection;
