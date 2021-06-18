import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';
import { typographyStyles } from './_typographyStyles';
export default createGlobalStyle`
  ${typographyStyles}  

  html, body {        
    scroll-behavior: smooth;
    ${tw`bg-white`}
  }

  #__next {
    max-width: 1920px;
    ${tw`grid bg-white grid-cols-12 relative pb-36  min-h-screen max-w-screen-2xl items-start content-start mx-auto md:pb-56`}
  }

`;
