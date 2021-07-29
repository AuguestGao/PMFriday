import React, { useState } from "react";
import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";

import { NewTimeContainer, TimeEntryContainer } from "./NewTime.styles";

const NewTime = ({ pushToTimes }) => {
  const [newTime, setNewTime] = useState({
    timeName: "",
    timeTotal: "",
    timeUnit: "hour",
  });

  const resetNewTime = () =>
    setNewTime({
      timeName: "",
      timeTotal: "",
      timeUnit: "hour",
    });

  const handleAddTimeClicked = (e) => {
    e.preventDefault();
    pushToTimes({ ...newTime, timeTotal: Number(newTime.total), timeused: 0 });
    resetNewTime();
  };

  const activeAddTimeButton =
    newTime.timeName.length && newTime.timeTotal.length;

  return (
    <NewTimeContainer>
      <TimeEntryContainer>
        <FormInput
          type="text"
          name="timeName"
          label="Category"
          value={newTime.timeName}
          onChange={(e) => setNewTime({ ...newTime, timeName: e.target.value })}
        />
        <FormInput
          type="number"
          name="timeTotal"
          label="Total Time"
          value={newTime.timeTotal}
          step="0.01"
          onChange={(e) =>
            setNewTime({ ...newTime, timeTotal: e.target.value })
          }
        />
        <select
          name="timeUnit"
          onChange={(e) => setNewTime({ ...newTime, timeUnit: e.target.value })}
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
