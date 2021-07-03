import React from "react";
import { Link } from "react-router-dom";
import AddButtonContainer from "./AddButton.styles";

const AddButton = () => (
  <Link to="/add">
    <AddButtonContainer>
      <div>&#43;</div>
    </AddButtonContainer>
  </Link>
);

export default AddButton;
