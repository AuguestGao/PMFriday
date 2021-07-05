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
    mobile: "",
    note: "",
    todo: [],
  });

  const dispatch = useDispatch();

  const onNameChange = (e) => setFile({ ...file, name: e.target.value });
  const onAddressChange = (e) => setFile({ ...file, address: e.target.value });
  const onEmailChange = (e) => setFile({ ...file, email: e.target.value });
  const onMobileChange = (e) => setFile({ ...file, mobile: e.target.value });

  const handleCreateButtonClicked = () => {
    console.log(file);
    dispatch(createCard(file));
    setFile({
      name: "",
      address: "",
      email: "",
      phone: "",
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
        type="email"
        name="email"
        value={file.email}
        label="Email"
        onChange={onEmailChange}
      />

      <FormInput
        type="tel"
        name="Mobile"
        value={file.mobile}
        label="Mobile (xxx-xxx-xxxx)"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        onChange={onMobileChange}
      />

      <Link to="/">
        <CustomButton createbutton onClick={handleCreateButtonClicked}>
          CREATE
        </CustomButton>
      </Link>
    </FormContainer>
  );
};

export default NewClientForm;
