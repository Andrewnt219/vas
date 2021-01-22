import { createGlobalStyle } from 'styled-components';
import { neutralPrismStyles } from './_prismStyles';
import { typographyStyles } from './_typographyStyles';
export default createGlobalStyle`
  ${typographyStyles}    
  ${neutralPrismStyles}  
`;
