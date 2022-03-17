import React from "react";
import CustomButtonContainer from "./styled";

export const CustomButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);
