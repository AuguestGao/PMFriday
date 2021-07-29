import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";

import { NewFieldContainer, CustomFieldContainer } from "./NewField.styles";

const NewField = ({ addToProfile }) => {
  const [field, setField] = useState({
    name: "",
    type: "text",
    value: "",
  });

  const resetField = () =>
    setField({
      name: "",
      type: "text",
      value: "",
    });

  const handleAddFieldClicked = (e) => {
    e.preventDefault();
    addToProfile({ ...field, id: nanoid() });
    resetField();
  };

  const activeAddFieldButton = field.name.length && field.value.length;

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
          <option value="date">Date</option>
        </select>
        <FormInput
          type={field.type}
          value={field.value}
          name="value"
          onChange={(e) => setField({ ...field, value: e.target.value })}
          label={field.type === "date" ? null : "Field Value"}
        />
        <CustomButton
          className="mt-2"
          addbutton
          onClick={handleAddFieldClicked}
          disabled={!activeAddFieldButton}
        >
          ADD
        </CustomButton>
      </CustomFieldContainer>
    </NewFieldContainer>
  );
};

export default NewField;
