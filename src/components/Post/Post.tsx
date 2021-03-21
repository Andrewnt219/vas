import styled from 'styled-components';
import tw from 'twin.macro';

const Title = styled.h1(() => [
	tw`font-bold text-2xl mt-5 transition-colors hover:text-primary md:(text-4xl mt-10)  xl:(text-5xl mt-14)`,
]);

const Wrapper = styled.div(() => [tw`px-4 max-w-prose mx-auto md:px-8`]);

export default { Title, Wrapper };
