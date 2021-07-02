import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardLinkContainer = styled(Link)`
  text-decoration: none;
`;

export const CardContainer = styled.div`
  display: flex;

  border: 2px solid coral;
  width: 400px;
  margin: 10px 20px;
  padding: 20px 20px;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;

  .name {
    color: coral;
    font-weight: bolder;
    font-size: 1.3rem;
  }

  span {
    font-size: x-small;
  }

  &:hover {
    cursor: pointer;
  }
`;
