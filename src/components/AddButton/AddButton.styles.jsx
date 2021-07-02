import styled from "styled-components";

const AddButtonContainer = styled.button`
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  background-color: coral;
  border-radius: 100%;
  padding: 2px;
  border: 0;
  box-shadow: 2px 2px 2px 1px gray;

  div {
    color: white;
    line-height: 100%;
    font-size: 2.5rem;
    font-weight: bolder;
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    box-shadow: 0 0;
    transform: translate(2px 2px);
  }
`;

export default AddButtonContainer;
