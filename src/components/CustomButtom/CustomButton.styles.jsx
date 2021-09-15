import { property } from "lodash";
import styled, { css } from "styled-components";

const buttonstyles = css`
  border-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.primaty};
  background-color: ${(props) => props.theme.colors.neutral};

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
  }
`;

const deletebuttonstyles = css`
  border-color: red;
  color: red;
  background-color: ${(props) => props.theme.colors.neutral};

  &:hover {
    background-color: red;
    border-color: white;
    color: white;
  }
`;

const disabledButtonStyles = css`
  border-color: gray;
  color: gray;
  background-color: ${(props) => props.theme.colors.neutral};
`;

const getButtonStyle = (props) => {
  if (props.button) {
    return props.disabled ? disabledButtonStyles : buttonstyles;
  } else if (props.deletebutton) {
    return deletebuttonstyles;
  } else {
    return null;
  }
};

const CustomButtonContainer = styled.button`
  width: 100px;
  height: 35px;
  border-radius: 10px;
  border-width: 2px;
  border-style: solid;
  background-color: white;
  font-size: ${(props) => props.theme.sizes.md};
  font-weight: bold;
  text-align: center;
  box-sizing: border-box;
  padding: 1px 3px;

  &:hover {
    cursor: pointer;
  }

  &.smallFont {
    font-size: ${(props) => props.theme.sizes.sm};
  }

  ${getButtonStyle}
`;

export default CustomButtonContainer;
