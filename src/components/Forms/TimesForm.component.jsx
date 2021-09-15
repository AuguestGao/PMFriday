import React, { useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";

import CustomButton from "../CustomButtom/CustomButton.component";
import NewField from "../NewField/NewField.component";
import { addNew } from "../../redux/ducks/cardsSlice";

import {
  FormPageContainer,
  FormContainer,
  ButtonsContainer,
} from "./Forms.styles";

const TimesForm = ({ saveTimes, cancelSaveTimes, timesData, cardId }) => {
  const isNewTimes = _.isEmpty(timesData);

  const [times, setTimes] = useState(() => {
    return isNewTimes ? {} : timesData;
  });

  const dispatch = useDispatch();

  const resetState = () => setTimes({ times: {} });

  const handleSaveTimesClicked = (e) => {
    e.preventDefault();
    dispatch(addNew({ cardId, target: "times", data: times }));
    saveTimes();
    resetState();
  };

  const handleCancelButtonClicked = () => {
    resetState();
    cancelSaveTimes();
  };

  const handleRemoveTimeClicked = (e) => {
    const key = e.target.parentNode.id;
    const modifiedTimes = _.cloneDeep(times);
    delete modifiedTimes[key];
    setTimes({ ...modifiedTimes });
  };

  const renderTimes = Object.entries(times).map(([k, v]) => (
    <div
      className="d-flex flex-row justify-content-between align-items-center"
      key={k}
      id={k}
    >
      <p>
        {v.name}: {v.value} {v.unit}
      </p>

      <div
        className="delete-entry"
        style={{ cursor: "pointer" }}
        onClick={handleRemoveTimeClicked}
      >
        &#x2716;
      </div>
    </div>
  ));

  return (
    <FormPageContainer>
      <FormContainer>
        <h2>Times</h2>
        {_.isEmpty(times) ? null : renderTimes}
        <NewField
          addToTimes={(props) => {
            const { id, ...otherProps } = props;
            setTimes({
              ...times,
              [id]: { ...otherProps },
            });
          }}
        />
      </FormContainer>
      <ButtonsContainer>
        <CustomButton button onClick={handleSaveTimesClicked}>
          CONFIRM
        </CustomButton>
        <CustomButton button onClick={handleCancelButtonClicked}>
          CANCEL
        </CustomButton>
      </ButtonsContainer>
    </FormPageContainer>
  );
};

export default TimesForm;
