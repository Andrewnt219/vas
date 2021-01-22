import styled from 'styled-components';
import tw from 'twin.macro';

export default function Callout() {
	return <Text>Call</Text>;
}

type TextProps = {};
const Text = styled.div<TextProps>`
	${tw`text-blue-500 dark:text-gray-500`}
`;
