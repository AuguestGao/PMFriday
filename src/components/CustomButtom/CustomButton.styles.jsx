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
  margin: 10px auto;
  border-color: red;
  color: red;

  &:hover {
    background-color: red;
    border-color: white;
    color: white;
  }
`;

const cancelbuttonstyles = css`
  margin: 0 auto;
  border-color: gray;
  color: gray;

  &:hover {
    background-color: gray;
    border-color: white;
    color: white;
  }
`;

const disabledButton = css`
  border-color: gray;
  color: gray;
`;

const getButtonStyle = (props) => {
  if (props.addbutton) {
    return addbuttonstyles;
  } else if (props.createbutton) {
    return props.disabled ? disabledButton : createbuttonstyles;
  } else if (props.deletebutton) {
    return deletebuttonstyles;
  } else if (props.cancelbutton) {
    return cancelbuttonstyles;
  } else {
    return null;
  }
};

const CustomButtonContainer = styled.button`
  /* width: 100px; */
  height: 45px;
  border-radius: 10px;
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
