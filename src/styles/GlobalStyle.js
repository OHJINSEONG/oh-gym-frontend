import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    list-style-type: none;
    text-decoration: none;
  }
  body{
    background-color: #D1D1D1;
  }
  button {
    border : none;
    background-color: transparent;
  }
  a{
    color: black;
  }
`;

export default GlobalStyle;
