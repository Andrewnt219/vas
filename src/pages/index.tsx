import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

function Index(): ReactElement {
	return <Container>Hello Seneca</Container>;
}

const Container = styled.h1`
	${tw`bg-red-500 w-full h-full text-white text-6xl`}
`;

export default Index;
