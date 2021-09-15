import styled from "styled-components";

export const HeaderWrapper = styled.header`
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
  margin: 0;
  padding: ${(props) => props.theme.sizes.xlg}
    calc(2 * ${(props) => props.theme.sizes.xlg});
  display: flex;
  justify-content: space-between;
  align-items: center;

  div:first-of-type {
    font-size: ${(props) => props.theme.sizes.xlg};
    font-weight: 700;
    color: ${(props) => props.theme.colors.highlight};
    cursor: pointer;
  }
`;

export const NavWrapper = styled.nav`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    float: left;
  }

  li a {
    font-size: ${(props) => props.theme.sizes.lg};
    display: block;
    color: ${(props) => props.theme.colors.primary};
    text-align: center;
    padding: 16px;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
  }

  li a:hover,
  li a:focus {
    color: ${(props) => props.theme.colors.highlight};
    transform: scale(1.1);
  }
`;
