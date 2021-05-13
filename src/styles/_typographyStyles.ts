import tw, { css } from 'twin.macro';

export const typographyStyles = css`
  :root {
    ${tw`font-sans text-skin-base`}
  }
`;

export const articleTitle = tw`text-2xl leading-tight font-black md:text-3xl xl:text-4xl`;

export const tag = tw`text-sm text-skin-muted`;

export const subtitle = tw`text-sm font-normal`;
export const h1 = tw`text-3xl leading-tight font-black xl:text-5xl`;

export const h2 = tw`
  leading-tight text-2xl font-black md:text-3xl xl:text-5xl
`;

export const h3 = tw`text-lg font-black leading-tight md:text-4xl`;
