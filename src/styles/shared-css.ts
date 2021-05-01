import { css } from 'styled-components';
import tw from 'twin.macro';

export const font = {
  h1: css`
    ${tw`text-3xl font-black leading-tight xl:text-5xl`};
  `,

  tag: css`
    ${tw`text-smaller text-skin-muted `}
  `,
  subtitle: css`
    ${tw`text-sm font-normal`}
  `,
};
export const label = css`
  ${tw`px-3 py-1 bg-primary text-white text-xs font-black hocus:(underline) md:text-sm`}
`;

export const container = css`
  ${tw`max-w-6xl mx-auto px-4 md:px-8 xl:px-0`}
`;

export const sectionH1 = css`
  ${tw` mb-10 font-black text-2xl md:text-4xl mx-auto max-w-max`}
  ${tw`lg:(text-5xl)`}

	::after {
    content: '';
    ${tw`block mt-2 mx-auto h-0.5 w-1/3 bg-primary md:h-1  md:mt-4 lg:mt-8`}
  }
`;

export const darkenImage = css`
  ${tw`relative`}

  ::after {
    ${tw`content absolute top-0 left-0 w-full h-full block bg-black opacity-0 transition-opacity`}
  }

  :hover ::after,
  :focus ::after {
    ${tw`opacity-10`}
  }
`;
