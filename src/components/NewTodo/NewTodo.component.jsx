import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";

import { NewTodoContainer } from "./NewTodo.styles";

const NewTodo = ({ pushToTodos }) => {
  const id = nanoid();

  const [todo, setTodo] = useState({
    id,
    content: "",
    isDone: false,
  });

  const resetTodo = () =>
    setTodo({
      ...todo,
      content: "",
    });

  const handleAddTodoClicked = (e) => {
    e.preventDefault();
    pushToTodos(todo);
    resetTodo();
  };

  return (
    <NewTodoContainer>
      <FormInput
        type="text"
        name="content"
        label="new entry"
        value={todo.content}
        onChange={(e) => setTodo({ ...todo, content: e.target.value })}
      />
      <CustomButton
        addbutton
        onClick={handleAddTodoClicked}
        disabled={!todo.content}
      >
        Add
      </CustomButton>
    </NewTodoContainer>
  );
};

export default NewTodo;
