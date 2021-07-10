import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCard,
  addNew,
  claimTime,
  toggleTodo,
} from "../../redux/ducks/cardsSlice";
import { useHistory } from "react-router-dom";

import CustomButton from "../CustomButtom/CustomButton.component";
import FormInput from "../FormInput/FormInput.component";
// import TimeEntryForm from "../TimeEntryForm/TimeEntryForm.component";
import NewField from "../NewField/NewField.component";
import NewTime from "../NewTime/NewTime.component";
import NewTodo from "../NewTodo/NewTodo.component";

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
  ConfirmDeleteContainer,
  InteractionsContainer,
} from "./Card-Detail.styles";

const CardDetail = ({ match }) => {
  const { cardId } = match.params;
  const card = useSelector((state) =>
    state.cards.find((card) => card.meta.id === cardId)
  );
  const { createdAt } = card.meta;

  const { times, note, todos } = card;
  const { name, ...otherFields } = card.profile;

  const idToTimeEntries = times.reduce((acc, entry) => {
    return { ...acc, [entry.id]: 0 };
  }, {});

  const [timeEntry, setTimeEntry] = useState(idToTimeEntries);
  const [hideConfirmBox, setHideConfirmBox] = useState(true);
  const [confirmName, setConfirmName] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const handleEnterTimeClicked = (e, id) => {
    e.preventDefault();
    // console.log(timeEntry, timeEntry[id]);
    dispatch(
      claimTime({ cardId, timeId: id, timeValue: Number(timeEntry[id]) })
    );
    setTimeEntry(idToTimeEntries);
  };

  const handleDeleteButtonClick = () => {
    setHideConfirmBox(false);
  };

  const handleConfirmDelete = () => {
    if (confirmName === card.profile.name) {
      dispatch(deleteCard(cardId));
      history.push("/");
    } else {
      window.alert("Unmatching name, delete failed");
    }
  };

  const handleEditButtonClick = () => {
    console.log("edit needed");
  };

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
        <table>
          <tr>
            <td>Category</td>
            <td>Unit</td>
            <td>Total</td>
            <td>Used</td>
            <td>Remain</td>
            <td>Progress</td>
          </tr>
          {data.map(({ id, name, unit, total, used }) => {
            const remain = total - used;
            return (
              <tr>
                <td>{name}</td>
                <td>{unit}</td>
                <td>{total.toFixed(1)}</td>
                <td>{used.toFixed(1)}</td>
                <td>{remain.toFixed(1)}</td>
                <td>
                  <progress value={used} max={total} />
                </td>
                <td>
                  <input
                    type="number"
                    onChange={(e) =>
                      setTimeEntry({
                        ...timeEntry,
                        [id]: Number(e.target.value),
                      })
                    }
                  ></input>
                  <CustomButton
                    addbutton
                    onClick={(e) => handleEnterTimeClicked(e, id)}
                    disabled={!timeEntry[id]}
                  >
                    +
                  </CustomButton>
                </td>
              </tr>
            );
          })}
        </table>
      ) : (
        <h3>Enter times</h3>
      );
    } else if (target === "todos") {
      const actives = [];
      const completions = [];
      for (const todo of data) {
        todo.isDone ? completions.push(todo) : actives.push(todo);
      }

      return (
        <div>
          <h2>Active</h2>
          {actives.length ? (
            actives.map((todo) => {
              const { id, content } = todo;
              return (
                <div key={id}>
                  <input
                    type="checkbox"
                    onChange={() =>
                      dispatch(
                        toggleTodo({
                          cardId,
                          todoId: todo.id,
                        })
                      )
                    }
                  />
                  <div>{content}</div>
                </div>
              );
            })
          ) : (
            <p>Bravo! You finished all your todos</p>
          )}
          <h2> Complete</h2>
          {completions.length ? (
            completions.map((todo) => {
              const { id, content } = todo;
              return (
                <div key={id}>
                  <input
                    type="checkbox"
                    checked
                    onChange={() =>
                      dispatch(
                        toggleTodo({
                          cardId,
                          todoId: todo.id,
                        })
                      )
                    }
                  />
                  <div style={{ "text-decoration": "line-through" }}>
                    {content}
                  </div>
                </div>
              );
            })
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
            <NewTodo
              pushToTodos={(todo) =>
                dispatch(addNew({ cardId, target: "todos", data: todo }))
              }
            />
            {renderTimesOrTodos("todos", todos)}
          </TodosContainer>
        </MainContainer>
        <NoteContainer>{renderNote}</NoteContainer>
        {!hideConfirmBox ? (
          <ConfirmDeleteContainer>
            <FormInput
              type="text"
              onChange={(e) => setConfirmName(e.target.value)}
              label={"Enter Client Name"}
              value={confirmName}
            />
            <InteractionsContainer>
              <CustomButton deletebutton onClick={handleConfirmDelete}>
                Confirm
              </CustomButton>
              <CustomButton
                cancelbutton
                onClick={() => setHideConfirmBox(true)}
              >
                Cancel
              </CustomButton>
            </InteractionsContainer>
          </ConfirmDeleteContainer>
        ) : (
          <InteractionsContainer>
            <CustomButton deletebutton onClick={handleDeleteButtonClick}>
              DELETE
            </CustomButton>
            <CustomButton editbutton onClick={handleEditButtonClick}>
              EDIT
            </CustomButton>
          </InteractionsContainer>
        )}
      </PageContainer>
    );
  }

  return <NotFoundContainer>No card {cardId}</NotFoundContainer>;
};

export default CardDetail;
