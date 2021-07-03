import styled from "styled-components";

const AddButtonContainer = styled.button`
  width: 50px;
  height: 50px;
  background-color: coral;
  border-radius: 100%;
  border: 0;
  box-shadow: 3px 3px 2px 1px gray;

  div {
    color: white;
    line-height: 100%;
    font-size: 2.5rem;
    font-weight: bolder;
    text-align: center;
    box-sizing: border-box;
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
