import React from "react";

import CustomConfirmbuttonContainer from "./CustomConfirmButton.styles";

const CustomButton = ({ handleClick, props, children }) => (
  <CustomConfirmbuttonContainer onClick={handleClick} {...props}>
    {children}
  </CustomConfirmbuttonContainer>
);

export default CustomButton;
