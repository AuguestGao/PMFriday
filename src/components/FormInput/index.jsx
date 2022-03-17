import React from "react";
import { FormInputContainer, GroupContainer, FormInputLabel } from "./styled";

export const FormInput = ({ label, ...props }) => (
  <GroupContainer>
    <FormInputContainer {...props} />
    {label ? (
      <FormInputLabel className={props.value ? "shrink" : ""}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);
