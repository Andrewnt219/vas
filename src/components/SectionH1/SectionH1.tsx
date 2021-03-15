import tw, { styled } from 'twin.macro';

/**
 * @description renders a styled header for a section
 */
type SectionH1Props = {};
const SectionH1 = styled.h1<SectionH1Props>`
	${tw`mb-10 text-2xl md:text-4xl mx-auto max-w-max relative pb-2 md:(pb-4 mb-20)`}
	${tw`lg:(text-5xl pb-8)`}

	::after {
		content: '';
		${tw`block absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px w-1/3 bg-primary md:h-1`}
	}
`;
export default SectionH1;
