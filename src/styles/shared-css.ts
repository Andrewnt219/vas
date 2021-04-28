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
  sectionTitle: css`
    ${tw`font-black text-2xl md:text-3xl xl:text-4xl`}
  `,
};
export const label = css`
  ${tw`px-3 py-1 bg-primary text-white text-xs font-black xl:text-sm`}
`;
