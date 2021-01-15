import tw, { styled } from 'twin.macro';

type Props = {};
const SurveyButton = styled.button<Props>`
	${tw`text-white bg-red-200 border-2 border-red-200  `}
	${tw`rounded-full py-2 px-8`}
  ${tw`font-semibold text-center text-2xl tracking-tightest `}
`;

export default SurveyButton;
