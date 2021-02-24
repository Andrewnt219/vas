import React, { VFC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {};

const AboutUs: VFC<Props> = ({}) => {
	return <Container>About us</Container>;
};

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw``}
`;
export default AboutUs;
