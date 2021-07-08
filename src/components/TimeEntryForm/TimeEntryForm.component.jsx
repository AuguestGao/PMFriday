import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTimes } from "../../redux/ducks/cardsSlice";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";

import {
  TimeEntryPageContainer,
  EntriesContainer,
  LineContainer,
} from "./TimeEntryForm.styles";

const TimeEntryForm = ({ cardId, ToggleHideTimeEntryForm }) => {
  const [times, setTimes] = useState([]);

  const resetTimes = setTimes([]);

  const [newEntry, setNewEntry] = useState({
    category: "",
    value: 0,
    unit: "hour",
  });

  const dispatch = useDispatch();
  const handelConfirmButtonClicked = (e) => {
    e.preventDefault();
    dispatch(addTimes(cardId, times));
    resetTimes();
    ToggleHideTimeEntryForm(true);
  };

  return (
    <TimeEntryPageContainer>
      <EntriesContainer>
        <h1>Approved Time Entry</h1>
        {/* <LineContainer>
          {times.map(({ category, value, unit }) => (
            <div key={category}>
              <h3>
                {category}: {value} {unit}
              </h3>
              <button
                onClick={() =>
                  setTimes(times.filter((entry) => entry.category !== category))
                }
              >
                &#10005;
              </button>
            </div>
          ))}
        </LineContainer>
        <form>
          <FormInput
            type="text"
            name="timeCatgory"
            label="Category"
            value={newEntry.category}
            onChange={(e) =>
              setNewEntry({ ...newEntry, category: e.target.value })
            }
          />
          <FormInput
            type="number"
            name="timeValue"
            label="Time"
            value={newEntry.value}
            onChange={(e) =>
              setNewEntry({ ...newEntry, value: e.target.value })
            }
          />
          <select
            name="unit"
            onChange={(e) => setNewEntry({ ...newEntry, unit: e.target.value })}
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
          <CustomButton
            addbutton
            onClick={() => setTimes([...times, newEntry])}
          >
            Add
          </CustomButton>
        </form> */}
      </EntriesContainer>
      {/* <CustomButton addbutton onClick={handelConfirmButtonClicked}>
        Confirm
      </CustomButton> */}
    </TimeEntryPageContainer>
  );
};

export default TimeEntryForm;
