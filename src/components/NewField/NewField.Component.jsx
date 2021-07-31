import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";

import { NewFieldContainer, CustomFieldContainer } from "./NewField.styles";

const NewField = ({ addToProfile, isProfile, addToTimes }) => {
  const [field, setField] = useState(() => {
    return isProfile
      ? {
          name: "",
          type: "text",
          value: "",
        }
      : {
          name: "",
          value: "",
          unit: "hour",
        };
  });

  const resetField = () =>
    isProfile
      ? setField({
          name: "",
          type: "text",
          value: "",
        })
      : setField({
          name: "",
          value: "",
          unit: "hour",
        });

  const handleAddProfileFieldClicked = (e) => {
    e.preventDefault();
    addToProfile({ ...field, id: nanoid() });
    resetField();
  };

  const handleAddTimeFieldClicked = (e) => {
    e.preventDefault();
    addToTimes({ ...field, id: nanoid(), used: 0 });
    resetField();
  };

  const activeAddFieldButton = field.name.length && field.value.length;

  return (
    <NewFieldContainer>
      {isProfile ? (
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
            value="text"
          >
            <option value="text">Text</option>
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
            onClick={handleAddProfileFieldClicked}
            disabled={!activeAddFieldButton}
          >
            ADD
          </CustomButton>
        </CustomFieldContainer>
      ) : (
        <CustomFieldContainer>
          <FormInput
            type="text"
            value={field.name}
            name="name"
            onChange={(e) => setField({ ...field, name: e.target.value })}
            label="Field Name"
          />
          <select
            name="unit"
            onChange={(e) => setField({ ...field, unit: e.target.value })}
            value="hour"
          >
            <option value="minute">Minute</option>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
          <FormInput
            type="number"
            value={field.value}
            name="value"
            onChange={(e) => setField({ ...field, value: e.target.value })}
            label="Total Time"
          />
          <CustomButton
            className="mt-2"
            addbutton
            onClick={handleAddTimeFieldClicked}
            disabled={!activeAddFieldButton}
          >
            ADD
          </CustomButton>
        </CustomFieldContainer>
      )}
    </NewFieldContainer>
  );
};

export default NewField;
