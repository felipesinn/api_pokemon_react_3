import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 5x; 
    font-family: 'Montserrat', sans-serif;
    background-color: #d9e5d6; 
    font-size: larger;
    color: antiquewhite;
  }

`;

export default GlobalStyles;