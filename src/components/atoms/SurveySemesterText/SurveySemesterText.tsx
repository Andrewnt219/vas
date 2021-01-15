import tw, { styled } from 'twin.macro';

type Props = {};
const SurveySemesterText = styled.span<Props>`
	${tw`uppercase font-bold text-4xl sm:text-5xl leading-close tracking-tighter `}
`;

export default SurveySemesterText;
