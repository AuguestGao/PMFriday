import styled, { css } from "styled-components";

const shrinkLabelStyles = css`
  top: -10px;
  font-size: 12px;
  color: ${(props) => props.theme.colors.primary};
`;

export const GroupContainer = styled.div`
  position: relative;
`;

export const FormInputContainer = styled.input`
  width: 100%;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  font-size: ${(props) => props.theme.sizes.lg};
  color: white;
  background-color: ${(props) => props.theme.colors.neutral};

  &:focus {
    outline: none;
  }

  &:focus ~ label {
    ${shrinkLabelStyles}
  }
`;

export const FormInputLabel = styled.label`
  color: white;
  font-size: ${(props) => props.theme.sizes.md};
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 3px;
  top: 8px;
  transition: 300ms ease all;

  &.shrink {
    ${shrinkLabelStyles}
  }
`;
