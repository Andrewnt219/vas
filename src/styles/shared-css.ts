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
  ${tw`px-3 py-1 bg-primary text-white text-xs font-black xl:text-sm`}
`;

export const container = css`
  ${tw`max-w-6xl mx-auto px-4 md:px-8`}
`;

export const sectionH1 = css`
  ${tw` mb-10 text-2xl md:text-4xl mx-auto max-w-max relative pb-2 md:(pb-4 mb-20)`}
  ${tw`lg:(text-5xl pb-8)`}

	::after {
    content: '';
    ${tw`block absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px w-1/3 bg-primary md:h-1`}
  }
`;
