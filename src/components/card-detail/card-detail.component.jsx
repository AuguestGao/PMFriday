import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCard,
  claimTime,
  toggleTodo,
  saveNote,
  addNew,
  changeCardStatus,
} from "../../redux/ducks/cardsSlice";
import { useHistory } from "react-router-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";

import CustomButton from "../CustomButtom/CustomButton.component";
import FormInput from "../FormInput/FormInput.component";
import NewField from "../NewField/NewField.component";
import NewTime from "../NewTime/NewTime.component";
import NewTodo from "../NewTodo/NewTodo.component";
import ProfileForm from "../ProfileForm/ProfileForm.component";

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
  const userId = useSelector((state) => state.user.id);
  const { cardId } = match.params;
  const card = useSelector((state) => state.cards.data[cardId]);

  const { addedAt, times, note, todos } = card;
  const { name, ...otherFields } = card.profile;

  // map timeId to entered time for claiming time
  const idToTimeEntries = Object.keys(times).reduce((acc, timeId) => {
    return { ...acc, [timeId]: 0 };
  }, {});

  const [timeEntry, setTimeEntry] = useState(idToTimeEntries);
  const [hideConfirmBox, setHideConfirmBox] = useState(true);
  const [confirmName, setConfirmName] = useState("");
  const [editorState, setEditorState] = useState(() =>
    // EditorState.createWithContent(convertFromRaw(note))
    {
      if (!note) {
        return EditorState.createEmpty();
      } else {
        return EditorState.createWithContent(convertFromRaw(note));
      }
    }
  );
  const [showProfileForm, toggleProfileForm] = useState(false);

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

  const handleSaveProfile = () => {
    toggleProfileForm(!showProfileForm);
    dispatch(changeCardStatus("loaded"));
  };

  const handleEditButtonClick = () => {
    console.log("edit needed");
  };

  const onChange = (editorState) => {
    // const contentState = editorState.getCurrentContent();
    // persist data
    // window.localStorage.setItem(
    //   "content",
    //   JSON.stringify(convertToRaw(contentState))
    // );
    setEditorState(editorState);
  };

  const onUnderlineClick = () =>
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  const onBoldClick = () =>
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  const onItalicClick = () =>
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onchange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleSaveNoteClicked = () => {
    console.log(editorState.getCurrentContent());
    dispatch(
      saveNote({
        cardId,
        note: convertToRaw(editorState.getCurrentContent()),
      })
    );
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
        {/* <textarea placeholder="write anything..." /> */}
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
        />
        <CustomButton cancelbutton onClick={handleSaveNoteClicked}>
          SAVE
        </CustomButton>
      </div>
    );
  };

  if (card) {
    if (showProfileForm) {
      return (
        <ProfileForm
          cardData={{ ...card.profile, id: cardId }}
          saveProfile={handleSaveProfile}
          cancelCreateProfile={() => toggleProfileForm(!showProfileForm)}
        />
      );
    }

    return (
      <PageContainer>
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
              <NewTime
                addToTimes={(time) =>
                  addNew({ userId, cardId, target: "times", data: time })
                }
              />
            </TimesContainer>
          </LeftPanelContainer>
          <TodosContainer>
            <h1>Todos</h1>
            <NewTodo
              addToTodos={(todo) =>
                addNew({ userId, cardId, target: "todos", data: todo })
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
