import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';
import { typographyStyles } from './_typographyStyles';
export default createGlobalStyle`
  ${typographyStyles}     
  
  
  html, body {    
    scroll-behavior: smooth;
  }

  #__next {
    ${tw`grid grid-cols-12 relative pb-36  min-h-screen items-start content-start md:pb-56`}
  }
`;
