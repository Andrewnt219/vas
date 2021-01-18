import React, { ReactElement } from 'react';
import tw, { styled } from 'twin.macro';

function Index(): ReactElement {
	return <Container>Coming soon.&nbsp;.</Container>;
}

const Container = styled.h1`
	${tw`bg-red-500 py-10 px-5 w-full  text-white text-6xl font-bold text-center`}
	${tw`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
`;

export default Index;
