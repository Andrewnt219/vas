import tw, { css } from 'twin.macro';

export const bodyFontFace = css`
  /* nunito-sans-300 - vietnamese_latin */
  @font-face {
    font-family: 'Nunito Sans';
    font-display: swap;
    font-style: normal;
    font-weight: 300;
    src: local(''),
      url('/fonts/nunito-sans-v6-vietnamese_latin-300.woff2') format('woff2'),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('/fonts/nunito-sans-v6-vietnamese_latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* nunito-sans-regular - vietnamese_latin */
  @font-face {
    font-family: 'Nunito Sans';
    font-display: swap;
    font-style: normal;
    font-weight: 400;
    src: local(''),
      url('/fonts/nunito-sans-v6-vietnamese_latin-regular.woff2')
        format('woff2'),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('/fonts/nunito-sans-v6-vietnamese_latin-regular.woff')
        format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* nunito-sans-300italic - vietnamese_latin */
  @font-face {
    font-family: 'Nunito Sans';
    font-style: italic;
    font-weight: 300;
    src: local(''),
      url('/fonts/nunito-sans-v6-vietnamese_latin-300italic.woff2')
        format('woff2'),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('/fonts/nunito-sans-v6-vietnamese_latin-300italic.woff')
        format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* nunito-sans-italic - vietnamese_latin */
  @font-face {
    font-family: 'Nunito Sans';
    font-style: italic;
    font-weight: 400;
    src: local(''),
      url('/fonts/nunito-sans-v6-vietnamese_latin-italic.woff2') format('woff2'),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('/fonts/nunito-sans-v6-vietnamese_latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* nunito-sans-700 - vietnamese_latin */
  @font-face {
    font-family: 'Nunito Sans';
    font-display: swap;
    font-style: normal;
    font-weight: 700;
    src: local(''),
      url('/fonts/nunito-sans-v6-vietnamese_latin-700.woff2') format('woff2'),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('/fonts/nunito-sans-v6-vietnamese_latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
  /* nunito-sans-900 - vietnamese_latin */
  @font-face {
    font-family: 'Nunito Sans';
    font-display: swap;
    font-style: normal;
    font-weight: 900;
    src: local(''),
      url('/fonts/nunito-sans-v6-vietnamese_latin-900.woff2') format('woff2'),
      /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('/fonts/nunito-sans-v6-vietnamese_latin-900.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }
`;

export const typographyStyles = css`
  :root {
    ${tw`font-sans text-skin-base`}
  }

  ${bodyFontFace}
`;

export const articleTitle = tw`text-2xl leading-tight font-black md:text-3xl xl:text-4xl`;

export const tag = tw`text-sm text-skin-muted`;

export const subtitle = tw`text-sm font-normal`;
export const h1 = tw`text-3xl leading-tight font-black xl:text-5xl`;

export const h2 = tw`
  leading-tight text-2xl font-black md:text-3xl xl:text-5xl
`;

export const h3 = tw`text-lg font-black leading-tight md:text-4xl`;
