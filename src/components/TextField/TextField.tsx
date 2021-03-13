import styled from 'styled-components';
import tw from 'twin.macro';

type TextFieldProps = {};
const TextField = styled.input<TextFieldProps>`
	${tw` transition-colors bg-gray-400 py-1 px-2 rounded-lg  focus:bg-transparent! md:(py-2 px-4)`}
`;

export default TextField;
