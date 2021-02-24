import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

const news: VFC<Props> = ({}) => {
	return <Container>News</Container>;
};

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw``}
`;
export default news;
