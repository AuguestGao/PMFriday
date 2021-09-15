import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardLinkContainer = styled(Link)`
  text-decoration: none;
`;

export const CardContainer = styled.div`
  display: flex;
  border: 2px solid ${(props) => props.theme.colors.primary};
  width: 400px;
  margin: 10px 20px;
  padding: 20px 20px;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  box-shadow: 4px 4px 2px 1px gray;
  transition: all 0.2s ease-in-out;

  .name {
    color: ${(props) => props.theme.colors.primary};
    font-weight: bolder;
    font-size: ${(props) => props.theme.sizes.lg};
  }

  span {
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => props.theme.sizes.sm};
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.accent};
  }
`;
