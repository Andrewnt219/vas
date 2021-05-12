import tw, { css } from 'twin.macro';

export const typographyStyles = css`
  :root {
    ${tw`font-sans text-skin-base`}
  }
`;

export const sectionTitle = tw`
  mb-10 font-black text-2xl md:text-4xl mx-auto max-w-max
  lg:(text-5xl)

  after:(content block mt-2 mx-auto h-0.5 w-1/3 bg-primary md:h-1  md:mt-4 lg:mt-8)
`;
export const articleTitle = tw`text-2xl leading-tight font-black md:text-3xl xl:text-4xl`;

export const tag = tw`text-sm text-skin-muted`;

export const subtitle = tw`text-sm font-normal`;
export const h1 = tw`text-3xl leading-tight font-black xl:text-5xl`;

export const h2 = tw`
  leading-tight text-2xl font-black md:text-3xl xl:text-5xl
`;

export const h3 = tw`text-lg font-black leading-tight md:text-4xl`;
