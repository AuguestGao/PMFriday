import styled from "styled-components";

export const HeaderWrapper = styled.header`
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .brand {
    font-size: ${(props) => props.theme.fontSizes.title};
    font-weight: 700;
    color: ${(props) => props.theme.colors.highlight};
    cursor: pointer;
    vertical-align: center;

    @media ${(props) => props.theme.breakpoints.mobile} {
      font-size: ${(props) => props.theme.fontSizes.mobileTitle};
    }
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
    font-size: ${(props) => props.theme.fontSizes.subtitle};
    display: block;
    color: ${(props) => props.theme.colors.primary};
    text-align: center;
    padding: ${(props) => props.theme.sizes.md};
    text-decoration: none;
    transition: all 0.3s ease-in-out;

    @media ${(props) => props.theme.breakpoints.mobile} {
      padding: ${(props) => props.theme.sizes.xxsm};
      font-size: ${(props) => props.theme.fontSizes.mobileSubtitle};
    }
  }

  li a:hover,
  li a:focus {
    color: ${(props) => props.theme.colors.highlight};
    transform: scale(1.1);
  }
`;
