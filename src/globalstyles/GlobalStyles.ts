import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 1px; 
    font-family: 'Montserrat', sans-serif;
    background-color: #21272f; 
    color: white; 
  }

`;

export default GlobalStyles;