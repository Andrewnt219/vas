import tw, { css } from 'twin.macro';

export const scaleImageCss = css`
  img {
    ${tw`transition-transform`}
  }
  :hover img {
    ${tw`transform scale-110`};
  }
`;

export const separator = css`
  ${tw`inline-block bg-current h-px`}
  width: 0.4em;
`;
