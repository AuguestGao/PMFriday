import styled from "styled-components";

export const FooterWrapper = styled.footer`
  height: 5rem;
  width: 100%;
  /* grid-column: 2 / span 1;
  grid-row: 3 / span 1; */
  grid-area: footer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.note};
  text-align: center;

  a {
    text-decoration: underline;
  }

  a:hover {
    color: ${(props) => props.theme.colors.highlight};
  }
`;
