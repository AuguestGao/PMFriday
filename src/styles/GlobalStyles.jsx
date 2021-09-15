import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  html, body {
    background-color: ${(props) => props.theme.colors.neutral};
    margin: 0;
    padding: 0;
    font-family: ${(props) => props.theme.fonts.main};
  }


  a {
    text-decoration: none;
    cursor: pointer;
  }

  code {
    font-family: ${(props) => props.theme.fonts.code};
  }

  button {
    background-color: ${(props) => props.theme.colors.neutral};
  }

`;
