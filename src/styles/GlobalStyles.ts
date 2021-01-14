import { createGlobalStyle } from 'styled-components';
import { _base } from './_baseStyles';
import { _typography } from './_typographyStyles';
import { _variables } from './_variablesStyles';

export default createGlobalStyle`
  ${_variables}
  ${_typography}
  ${_base}
`;
