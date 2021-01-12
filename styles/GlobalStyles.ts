import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    font-size: max(100%, 1.25vw);
  }

  html, body {
    width: 100%;
    height: 100%;
  }
`;
