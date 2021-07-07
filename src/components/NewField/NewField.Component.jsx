import React, { useState } from "react";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";

import { NewFieldContainer, CustomFieldContainer } from "./NewField.styles";

const NewField = ({ pushToProfile, cancelAction }) => {
  const [field, setField] = useState({
    name: "",
    type: "",
    value: "",
  });

  const resetField = () =>
    setField({
      name: "",
      type: "",
      value: "",
    });

  const handleAddClicked = (e) => {
    e.preventDefault();
    pushToProfile(field);
    resetField();
  };

  const handleCancelClicked = (e) => {
    e.preventDefault();
    cancelAction();
  };

  return (
    <NewFieldContainer>
      <CustomFieldContainer>
        <FormInput
          type="text"
          value={field.name}
          name="name"
          onChange={(e) => setField({ ...field, name: e.target.value })}
          label="Field Name"
        />
        <select
          name="type"
          onChange={(e) => setField({ ...field, type: e.target.value })}
        >
          <option value="text" defaultValue>
            Text
          </option>
          <option value="number">Number</option>
          <option value="tel">Phone</option>
          <option value="email">Email</option>
          <option value="date">date</option>
        </select>
        <FormInput
          type={field.type}
          value={field.value}
          name="value"
          onChange={(e) => setField({ ...field, value: e.target.value })}
          label={field.type === "date" ? null : "Value"}
        />
      </CustomFieldContainer>

      <CustomButton
        addbutton
        onClick={handleAddClicked}
        disable={field.name.length && field.value.length ? false : true}
      >
        ADD
      </CustomButton>
      <CustomButton cancelbutton onClick={handleCancelClicked}>
        CANCEL
      </CustomButton>
    </NewFieldContainer>
  );
};

export default NewField;
