import styled, { css } from "styled-components";

const addbuttonstyles = css`
  border-color: coral;
  color: coral;

  &:hover {
    background-color: coral;
    border-color: white;
    color: white;
  }
`;

const createbuttonstyles = css`
  border-color: #4c8bf5;
  color: #4c8bf5;

  &:hover {
    background-color: #4c8bf5;
    border-color: white;
    color: white;
  }
`;

const deletebuttonstyles = css`
  border-color: tomato;
  color: tomato;

  &:hover {
    background-color: tomato;
    border-color: white;
    color: white;
  }
`;

const getButtonStyle = (props) => {
  if (props.addbutton) {
    return addbuttonstyles;
  } else if (props.createbutton) {
    return createbuttonstyles;
  } else if (props.deletebutton) {
    return deletebuttonstyles;
  } else {
    return null;
  }
};

const CustomButtonContainer = styled.button`
  width: 100px;
  height: 45px;
  border-radius: 5px;
  border-width: 3px;
  border-style: solid;
  background-color: white;
  font-size: 1rem;
  font-weight: bolder;
  text-align: center;
  box-sizing: border-box;
  padding: 1px 3px;

  &:hover {
    cursor: pointer;
  }

  ${getButtonStyle}
`;

export default CustomButtonContainer;
