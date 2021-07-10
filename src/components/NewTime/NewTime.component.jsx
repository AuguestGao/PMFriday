import React, { useState } from "react";
import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";

import { NewTimeContainer, TimeEntryContainer } from "./NewTime.styles";

const NewTime = ({ pushToTimes }) => {
  const [newTime, setNewTime] = useState({
    name: "",
    total: "",
    unit: "hour",
    used: 0,
  });

  const resetNewTime = () =>
    setNewTime({
      ...newTime,
      name: "",
      total: "",
      unit: "hour",
    });

  const handleAddTimeClicked = (e) => {
    e.preventDefault();
    pushToTimes({ ...newTime, total: Number(newTime.total) });
    resetNewTime();
  };

  const activeAddTimeButton = newTime.name.length && newTime.total.length;

  return (
    <NewTimeContainer>
      <TimeEntryContainer>
        <FormInput
          type="text"
          name="name"
          label="Category"
          value={newTime.name}
          onChange={(e) => setNewTime({ ...newTime, name: e.target.value })}
        />
        <FormInput
          type="number"
          name="total"
          label="Total Time"
          value={newTime.total}
          step="0.01"
          onChange={(e) => setNewTime({ ...newTime, total: e.target.value })}
        />
        <select
          name="unit"
          onChange={(e) => setNewTime({ ...newTime, unit: e.target.value })}
        >
          <option value="hour" defaultValue>
            hours
          </option>
          <option value="minute">minutes</option>
          <option value="day">days</option>
          <option value="week">weeks</option>
          <option value="month">months</option>
          <option value="year">years</option>
        </select>
      </TimeEntryContainer>

      <CustomButton
        addbutton
        onClick={handleAddTimeClicked}
        disabled={!activeAddTimeButton}
      >
        Add
      </CustomButton>
    </NewTimeContainer>
  );
};

export default NewTime;
