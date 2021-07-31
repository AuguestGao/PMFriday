import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  claimTime,
  toggleTodo,
  addNew,
  changeCardStatus,
  autoSaveNote,
  removeATodo,
  autoSaveTodos,
} from "../../redux/ducks/cardsSlice";
import { useHistory } from "react-router-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import _ from "lodash";

import CustomButton from "../CustomButtom/CustomButton.component";
import FormInput from "../FormInput/FormInput.component";
import NewTodo from "../NewTodo/NewTodo.component";
import ProfileForm from "../Forms/ProfileForm.component";
import TimesForm from "../Forms/TimesForm.component";
import { firestore } from "../../firebase/firebase";

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
  const card = useSelector((state) => state.cards.data[cardId]);
  const userId = useSelector((state) => state.user.id);

  const { addedAt, times, note, todos } = card;
  const { name, ...otherFields } = card.profile;

  // map timeId to entered time for time claiming
  const idToTimeEntries = Object.keys(times).reduce((acc, timeId) => {
    return { ...acc, [timeId]: 0 };
  }, {});

  const [timeEntry, setTimeEntry] = useState(idToTimeEntries);
  const [hideConfirmBox, setHideConfirmBox] = useState(true);
  const [confirmName, setConfirmName] = useState("");
  const [editorState, setEditorState] = useState(() => {
    if (_.isEmpty(note)) {
      return EditorState.createEmpty();
    } else {
      return EditorState.createWithContent(convertFromRaw(note));
    }
  });
  const [showProfileForm, toggleProfileForm] = useState(false);
  const [showTimesForm, toggleTimesForm] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const resetClaimTime = () => {
    setTimeEntry(idToTimeEntries); //reset all time claim to 0
  };

  const handleClaimTimeClicked = async (e, id) => {
    e.preventDefault();
    dispatch(claimTime({ cardId, timeId: id, newUsed: timeEntry[id] }));
    resetClaimTime();
  };

  const handleSaveChangeCardClick = async () => {
    try {
      await firestore
        .doc(`users/${userId}/cards/${cardId}`)
        .update({ ...card });
      resetClaimTime();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDiscardChangeCardClick = () => {
    history.push("/");
  };

  const handleDeleteCardClick = () => {
    setHideConfirmBox(false);
  };

  const handleConfirmDelete = async () => {
    if (confirmName === card.profile.name) {
      try {
        await firestore.doc(`users/${userId}/cards/${cardId}`).delete();
      } catch (err) {
        setError(err.message);
      }

      history.push("/");
    } else {
      window.alert("Unmatching name, delete failed");
    }
  };

  const handleSaveProfile = () => {
    toggleProfileForm(!showProfileForm);
    dispatch(changeCardStatus("loaded"));
  };

  const handleSaveTimes = () => {
    toggleTimesForm(!showTimesForm);
  };

  const onDraftEditorChange = (editorState) => setEditorState(editorState);

  const onUnderlineClick = () =>
    onDraftEditorChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  const onBoldClick = () =>
    onDraftEditorChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  const onItalicClick = () =>
    onDraftEditorChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onchange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleRemoveTodoClicked = (e) => {
    dispatch(removeATodo({ cardId, todoId: e.target.parentNode.id }));
  };

  const renderProfile = (fields) => {
    const { customFields, addedAt, ...defaultFields } = fields;
    return (
      <>
        <NormalTextContainer key={"addedAt"}>
          ADDEDED AT: {addedAt.slice(0, 10)}
        </NormalTextContainer>
        {Object.entries(defaultFields).map(([k, v]) => (
          <NormalTextContainer key={k}>
            {k.toUpperCase()}: {v}
          </NormalTextContainer>
        ))}
        {Object.values(customFields).map((field) => (
          <NormalTextContainer key={field.name}>
            {field.name.toUpperCase()}: {field.value}
          </NormalTextContainer>
        ))}
      </>
    );
  };

  const renderTimesOrTodos = (target, data) => {
    if (target === "times") {
      return !_.isEmpty(data) ? (
        <table>
          <thead>
            <tr>
              <td>Category</td>
              <td>Unit</td>
              <td>Total</td>
              <td>Used</td>
              <td>Remain</td>
              <td>Progress</td>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([id, v]) => {
              const remain = Number(v.value) - Number(v.used);
              return (
                <tr key={id}>
                  <td>{v.name}</td>
                  <td>{v.unit}</td>
                  <td>{Number(v.value).toFixed(1)}</td>
                  <td>{Number(v.used).toFixed(1)}</td>
                  <td>{remain.toFixed(1)}</td>
                  <td>
                    <progress value={v.used} max={v.value} />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={timeEntry[id]}
                      onChange={(e) =>
                        setTimeEntry({
                          ...timeEntry,
                          [id]: Number(e.target.value),
                        })
                      }
                    ></input>
                    <CustomButton
                      addbutton
                      onClick={(e) => handleClaimTimeClicked(e, id)}
                      disabled={!timeEntry[id]}
                    >
                      +
                    </CustomButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
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
        <div onBlur={() => dispatch(autoSaveTodos({ cardId, todos }))}>
          <h2>Active</h2>
          {actives.length ? (
            actives.map((todo) => {
              const { id, content } = todo;
              return (
                <div key={id} id={id} className="d-flex flex-row">
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
                  <div
                    className="text-white"
                    style={{ cursor: "pointer" }}
                    onClick={handleRemoveTodoClicked}
                  >
                    &#x2716;
                  </div>
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
                <div key={id} id={id} className="d-flex flex-row">
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
                  <div
                    className="text-white"
                    style={{ cursor: "pointer" }}
                    onClick={handleRemoveTodoClicked}
                  >
                    &#x2716;
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

  const renderNote = () => {
    return (
      <div className="editorcontainer">
        <button onClick={onUnderlineClick}>U</button>
        <button onClick={onBoldClick}>
          <b>B</b>
        </button>
        <button onClick={onItalicClick}>
          <em>I</em>
        </button>
        <div className="editors"></div>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          onBlur={() =>
            dispatch(
              autoSaveNote({
                cardId,
                note: convertToRaw(editorState.getCurrentContent()),
              })
            )
          }
        />
      </div>
    );
  };

  if (card) {
    if (showProfileForm) {
      return (
        <ProfileForm
          cardData={{ ...card.profile }}
          cardId={cardId}
          saveProfile={handleSaveProfile}
          cancelSaveProfile={() => toggleProfileForm(!showProfileForm)}
        />
      );
    }

    if (showTimesForm) {
      return (
        <TimesForm
          timesData={card.times}
          cardId={cardId}
          saveTimes={handleSaveTimes}
          cancelSaveTimes={() => toggleTimesForm(!showTimesForm)}
        />
      );
    }

    return (
      <PageContainer>
        {error ? <div>{error}</div> : null}
        <TitleContainer>{name}</TitleContainer>
        <MainContainer>
          <LeftPanelContainer>
            <ProfileContainer>
              {renderProfile({ addedAt, ...otherFields })}
              <CustomButton
                editbutton
                onClick={() => toggleProfileForm(!showProfileForm)}
              >
                EditProfile
              </CustomButton>
            </ProfileContainer>
            <TimesContainer>
              {renderTimesOrTodos("times", times)}
              <CustomButton
                editbutton
                onClick={() => toggleTimesForm(!showTimesForm)}
              >
                EditTimes
              </CustomButton>
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
        <NoteContainer>{renderNote()}</NoteContainer>
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
            <CustomButton editbutton onClick={handleSaveChangeCardClick}>
              SaveChange
            </CustomButton>
            <CustomButton editbutton onClick={handleDiscardChangeCardClick}>
              DiscardChange
            </CustomButton>
            <CustomButton deletebutton onClick={handleDeleteCardClick}>
              DELETE_CARD
            </CustomButton>
          </InteractionsContainer>
        )}
      </PageContainer>
    );
  }

  return <NotFoundContainer>No card {cardId}</NotFoundContainer>;
};

export default CardDetail;
