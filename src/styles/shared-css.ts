import { css } from 'styled-components';
import tw from 'twin.macro';

export const font = {
  h1: css`
    ${tw`text-3xl font-black leading-tight`};
  `,
  tag: css`
    ${tw`text-smaller text-skin-muted`}
  `,
  subtitle: css`
    ${tw`text-sm font-normal`}
  `,
};
export const label = css`
  ${tw`px-3 py-1 bg-primary text-white text-smaller font-black`}
`;
