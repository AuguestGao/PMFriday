import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { createCard } from "../../redux/ducks/cardsSlice";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";
import { FormContainer } from "./NewClientForm.styles";

const NewClientForm = () => {
  const [file, setFile] = useState({
    name: "",
    address: "",
    email: "",
    isVirtual: false,
    treatment: 0,
    travel: 0,
    documentation: 0,
    planning: 0,
    fileSearch: 0,
    assessment: 0,
    note: "",
    todo: [],
  });

  const dispatch = useDispatch();

  const onNameChange = (e) => setFile({ ...file, name: e.target.value });
  const onAddressChange = (e) => setFile({ ...file, address: e.target.value });
  const onEmailChange = (e) => setFile({ ...file, email: e.target.value });
  // const onIsVirtualChange = (e) =>
  //   setFile({ ...file, isVirtual: !e.target.checked });
  // const onEmailChange = (e) => setFile({ ...file, email: e.target.value });
  // const onPlanTimeChange = (e) =>
  //   setFile({ ...file, planning: e.target.value });

  const handleCreateButtonClicked = () => {
    console.log(file);
    dispatch(createCard(file));
    setFile({
      name: "",
      address: "",
      email: "",
      isVirtual: false,
      treatment: 0,
      travel: 0,
      documentation: 0,
      planning: 0,
      fileSearch: 0,
      assessment: 0,
      note: "",
      todo: [],
    });
  };

  return (
    <FormContainer>
      <h2>Create a new client file</h2>
      <FormInput
        type="text"
        name="fileName"
        value={file.name}
        label="Name"
        onChange={onNameChange}
      />
      <FormInput
        type="text"
        name="fileAddress"
        value={file.address}
        label="Address"
        onChange={onAddressChange}
      />

      <FormInput
        type="Email"
        name="email"
        value={file.email}
        label="Email"
        onChange={onEmailChange}
      />
      {/* 
      <label htmlFor="fileIsVirtual">Virtual </label>
      <input
        type="checkbox"
        id="fileIsVirtual"
        name="fileIsVirtual"
        onChange={onIsVirtualChange}
      /> */}
      <Link to="/">
        <CustomButton createbutton onClick={handleCreateButtonClicked}>
          CREATE
        </CustomButton>
      </Link>
    </FormContainer>
  );
};

export default NewClientForm;
