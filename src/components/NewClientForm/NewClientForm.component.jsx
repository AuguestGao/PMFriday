import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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

  const history = useHistory();

  const onNameChange = (e) => setFile({ ...file, name: e.target.value });
  const onAddressChange = (e) => setFile({ ...file, address: e.target.value });
  const onEmailChange = (e) => setFile({ ...file, email: e.target.value });
  const onMobileChange = (e) => setFile({ ...file, mobile: e.target.value });

  const handleCreateButtonClicked = () => {
    dispatch(createCard(file));
    setFile({
      name: "",
      address: "",
      email: "",
      phone: "",
      note: "",
      todo: [],
    });
    history.push("/");
  };

  const handleCancelButtonClicked = () => {
    setFile({
      name: "",
      address: "",
      email: "",
      phone: "",
      note: "",
      todo: [],
    });
    history.push("/");
  };

  return (
    <FormContainer>
      <h2>New Client</h2>
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

      <CustomButton
        createbutton
        onClick={handleCreateButtonClicked}
        disabled={!file.name.length}
      >
        CREATE
      </CustomButton>
      <CustomButton cancelbutton onClick={handleCancelButtonClicked}>
        CANCEL
      </CustomButton>
    </FormContainer>
  );
};

export default NewClientForm;
