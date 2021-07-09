import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCard, addNew } from "../../redux/ducks/cardsSlice";
import { useHistory } from "react-router-dom";

import CustomButton from "../CustomButtom/CustomButton.component";
import FormInput from "../FormInput/FormInput.component";
// import TimeEntryForm from "../TimeEntryForm/TimeEntryForm.component";
import NewField from "../NewField/NewField.component";
import NewTime from "../NewTime/NewTime.component";

import {
  NotFoundContainer,
  PageContainer,
  TitleContainer,
  MainContainer,
  LeftPanelContainer,
  ProfileContainer,
  TimesContainer,
  TodosContainer,
  NoteContainer,
  NormalTextContainer,
} from "./Card-Detail.styles";

const CardDetail = ({ match }) => {
  const { cardId } = match.params;
  const card = useSelector((state) =>
    state.cards.find((card) => card.meta.id === cardId)
  );
  const { createdAt } = card.meta;

  const { times, note, todos } = card;
  const { name, ...otherFields } = card.profile;
  // const [times, setTimes] = useState(card.times);
  // const [note, setNote] = useState(card.note);
  // const [todos, setTodos] = useState(card.todos);

  const dispatch = useDispatch();

  const renderProfile = (fields) =>
    Object.entries(fields).map(([k, v]) =>
      k !== "customFields" ? (
        k !== "createdAt" ? (
          <NormalTextContainer key={k}>
            {k.toUpperCase()}: {v}
          </NormalTextContainer>
        ) : (
          <NormalTextContainer key={k}>
            CREATED AT: {v.slice(0, 10)}
          </NormalTextContainer>
        )
      ) : (
        v.map((field) => (
          <NormalTextContainer key={field.name}>
            {field.name.toUpperCase()}: {field.value}
          </NormalTextContainer>
        ))
      )
    );

  const renderTimesOrTodos = (target, data) => {
    if (target === "times") {
      return data.length ? (
        data.map((time) => (
          <div key={time.id}>
            {time.name}, total: {time.total}, used: {time.used}, {time.unit}
          </div>
        ))
      ) : (
        <h3>Enter times</h3>
      );
    } else if (target === "todos") {
      const { actives, completions } = data;

      return (
        <div>
          <h2>Active</h2>
          {actives.length ? (
            actives.map((todo) => <div key={todo.id}>{todo.content}</div>)
          ) : (
            <p>Bravo! You finished all your todos</p>
          )}
          <h2> Complete</h2>
          {completions.length ? (
            completions.map((todo) => <div key={todo.id}>{todo.content}</div>)
          ) : (
            <p>Nothing came through yet.</p>
          )}
        </div>
      );
    }
  };

  const renderNote = note ? (
    <div>
      <h2>NOTE:</h2>
      <div>{note}</div>
    </div>
  ) : (
    <h2>Add Note</h2>
  );

  if (card) {
    return (
      <PageContainer>
        <TitleContainer>{name}</TitleContainer>
        <MainContainer>
          <LeftPanelContainer>
            <ProfileContainer>
              {renderProfile({ createdAt, ...otherFields })}
              <NewField
                pushToProfile={(field) =>
                  dispatch(addNew({ cardId, target: "profile", data: field }))
                }
              />
            </ProfileContainer>
            <TimesContainer>
              {renderTimesOrTodos("times", times)}
              <NewTime
                pushToTimes={(time) =>
                  dispatch(addNew({ cardId, target: "times", data: time }))
                }
              />
            </TimesContainer>
          </LeftPanelContainer>
          <TodosContainer>
            <h1>Todos</h1>
            {renderTimesOrTodos("todos", todos)}
          </TodosContainer>
        </MainContainer>
        <NoteContainer>{renderNote}</NoteContainer>
      </PageContainer>
    );
  }

  return <NotFoundContainer>No card {cardId}</NotFoundContainer>;
};

export default CardDetail;
