import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardLinkContainer = styled(Link)`
  text-decoration: none;
`;

export const CardContainer = styled.div`
  display: flex;
  width: 400px;
  min-width: 270px;
  /* margin: 10px auto; */
  padding: 20px 20px;
  border: 2px solid ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 3px 3px 10px 0px darkgray;
  transition: all 0.2s ease-in-out;

  .name {
    color: ${(props) => props.theme.colors.primary};
    font-weight: bolder;
    font-size: ${(props) => props.theme.fontSizes.subtitle};
  }

  span {
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => props.theme.sizes.sm};
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.primary};
  }

  &:hover * {
    color: white;
  }

  @media ${(props) => props.theme.breakpoints.mobile} {
    width: 270px;
  } ;
`;
