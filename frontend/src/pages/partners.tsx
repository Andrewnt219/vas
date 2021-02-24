import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

const partners: VFC<Props> = ({}) => {
	return <Container>Partners</Container>;
};

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw``}
`;
export default partners;
