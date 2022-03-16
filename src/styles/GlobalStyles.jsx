import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  html, body {
      margin: 0;
      padding: 0;
      font-family: ${(props) => props.theme.fonts.main};
      width: 100vw;
      background-color: ${(props) => props.theme.colors.neutral};
      color:#ffffff;
  };

  .App {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 5rem auto 5rem;
    grid-template-columns: 10rem minmax(40rem, 1fr) 10rem;
    grid-template-areas:
    ". header ."
    ". main ."
    ". footer .";
    font-size: ${(props) => props.theme.fontSizes.text};

    @media ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: 5rem minmax(15rem, 1fr) 5rem;
  };

  @media ${(props) => props.theme.breakpoints.mobile} {
    grid-template-columns: 2rem minmax(10rem, 1fr) 2rem;
    font-size: ${(props) => props.theme.fontSizes.mobileText};
  };
  };

  a {
    text-decoration: none;
    cursor: pointer;
    color: ${(props) => props.theme.colors.primary}
  };

  a.sign {
    color: ${(props) => props.theme.colors.neutral}
  }

  code {
    font-family: ${(props) => props.theme.fonts.code};
  };

  button {
      background-color: ${(props) => props.theme.colors.neutral};
    };

  div {
    box-sizing: border-box;
  }

`;
