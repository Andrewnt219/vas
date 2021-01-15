import tw, { styled } from 'twin.macro';

type Props = {};
const SurveySectionQuestionGroup = styled.div<Props>`
	${tw`px-20 space-y-10`}

	& > *:last-child {
		${tw`mx-4`}
	}
`;

export default SurveySectionQuestionGroup;
