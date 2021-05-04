import tw, { styled } from 'twin.macro';

export const SectionH1 = styled.h1`
  ${tw` mb-10 font-black text-2xl md:text-4xl mx-auto max-w-max`}
  ${tw`lg:(text-5xl)`}

	::after {
    content: '';
    ${tw`block mt-2 mx-auto h-0.5 w-1/3 bg-primary md:h-1  md:mt-4 lg:mt-8`}
  }
`;
