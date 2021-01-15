import OrientationPage from '@src/components/pages/SurveyOrientationPage';
import React, { ReactElement } from 'react';
import { styled } from 'twin.macro';

type Props = {};

function orientation({}: Props): ReactElement {
	return <OrientationPage />;
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>``;

export default orientation;
