import OrientationPage from '@src/components/pages/OrientationPage';
import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

function orientation({}: Props): ReactElement {
	return <OrientationPage />;
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>``;

export default orientation;
