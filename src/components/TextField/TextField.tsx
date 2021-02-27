import styled from 'styled-components';
import tw from 'twin.macro';

type TextFieldProps = {};
const TextField = styled.input<TextFieldProps>`
	${tw` transition-colors bg-gray focus:bg-gray`}
`;

export default TextField;
