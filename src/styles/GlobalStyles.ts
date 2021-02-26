import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';
import { typographyStyles } from './_typographyStyles';
export default createGlobalStyle`
  ${typographyStyles}     

  #__next {
    ${tw`grid grid-cols-12 relative pb-56 min-h-screen`}
  }
`;
