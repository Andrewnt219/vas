import tw, { styled } from 'twin.macro';

type Props = {};
const SurveySectionAnswerInput = styled.input<Props>`
	--color: hsla(var(--red-500-hsl), 0.4);

	${tw`w-full border-b-2 py-2 px-1`}
	${tw`font-medium`}
  ${tw`outline-none`}
  
  border-color: var(--color);

	::placeholder {
		color: var(--color);
	}
`;

export default SurveySectionAnswerInput;
