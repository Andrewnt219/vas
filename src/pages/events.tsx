import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

const events: VFC<Props> = ({}) => {
	return <Container>Events</Container>;
};

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw``}
`;
export default events;
