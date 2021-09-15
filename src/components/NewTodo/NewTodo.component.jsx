import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";

import { NewTodoContainer } from "./NewTodo.styles";

const NewTodo = ({ pushToTodos }) => {
  const [content, setContent] = useState("");

  const resetTodo = () => setContent("");

  const handleAddTodoClicked = (e) => {
    e.preventDefault();
    pushToTodos({ id: nanoid(), isDone: false, content });
    resetTodo();
  };

  return (
    <NewTodoContainer>
      <FormInput
        type="text"
        name="content"
        label="new entry"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <CustomButton
        button
        onClick={handleAddTodoClicked}
        disabled={!content}
        style={{ marginTop: "10px" }}
      >
        Add
      </CustomButton>
    </NewTodoContainer>
  );
};

export default NewTodo;
