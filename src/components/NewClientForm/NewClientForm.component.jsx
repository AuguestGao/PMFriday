import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createCard } from "../../redux/ducks/cardsSlice";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";
import { FormContainer } from "./NewClientForm.styles";

const NewClientForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
  });

  const dispatch = useDispatch();

  const history = useHistory();

  const onNameChange = (e) => setProfile({ ...profile, name: e.target.value });
  const onAddressChange = (e) =>
    setProfile({ ...profile, address: e.target.value });
  const onEmailChange = (e) =>
    setProfile({ ...profile, email: e.target.value });
  const onMobileChange = (e) =>
    setProfile({ ...profile, mobile: e.target.value });

  const handleCreateButtonClicked = () => {
    dispatch(createCard(profile));
    setProfile({
      name: "",
      address: "",
      email: "",
      mobile: "",
    });
    history.push("/");
  };

  const handleCancelButtonClicked = () => {
    setProfile({
      name: "",
      address: "",
      email: "",
      phone: "",
    });
    history.push("/");
  };

  return (
    <FormContainer>
      <h2>New Client</h2>
      <FormInput
        type="text"
        name="profileName"
        value={profile.name}
        label="Name"
        onChange={onNameChange}
      />
      <FormInput
        type="text"
        name="profileAddress"
        value={profile.address}
        label="Address"
        onChange={onAddressChange}
      />

      <FormInput
        type="email"
        name="proemail"
        value={profile.email}
        label="Email"
        onChange={onEmailChange}
      />

      <FormInput
        type="tel"
        name="profilMobile"
        value={profile.mobile}
        label="Mobile (xxx-xxx-xxxx)"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        onChange={onMobileChange}
      />

      <CustomButton
        createbutton
        onClick={handleCreateButtonClicked}
        disabled={!profile.name.length}
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
