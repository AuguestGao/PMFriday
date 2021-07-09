import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createCard } from "../../redux/ducks/cardsSlice";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";
import {
  NewClientFormPageContainer,
  FormContainer,
  ButtonsContainer,
  CustomFieldRenderContainer,
} from "./NewClientForm.styles";

import NewField from "../NewField/NewField.component";

const NewClientForm = () => {
  const [profile, setProfile] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
    customFields: [],
  });

  const [hideNewFieldForm, toggleHideNewFieldForm] = useState(true);

  const dispatch = useDispatch();

  const history = useHistory();

  const resetState = () =>
    setProfile({
      name: "",
      address: "",
      email: "",
      mobile: "",
      customFields: [],
    });

  const handleCreateButtonClicked = (e) => {
    e.preventDefault();
    dispatch(createCard(profile));
    resetState();
    history.push("/");
  };

  const handleCancelButtonClicked = () => {
    resetState();
    history.push("/");
  };

  const handleAddFieldButtonClicked = (e) => {
    e.preventDefault();
    toggleHideNewFieldForm(false);
  };

  const renderCustomFields = profile.customFields.map((field) => (
    <CustomFieldRenderContainer>
      {field.name}: {field.value}
    </CustomFieldRenderContainer>
  ));

  return (
    <NewClientFormPageContainer>
      <FormContainer>
        <h2>New Client</h2>
        <FormInput
          type="text"
          name="profileName"
          value={profile.name}
          label="Name"
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          required
        />
        <FormInput
          type="text"
          name="profileAddress"
          value={profile.address}
          label="Address"
          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
        />

        <FormInput
          type="email"
          name="profileEmail"
          value={profile.email}
          label="Email"
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />

        <FormInput
          type="tel"
          name="profilMobile"
          value={profile.mobile}
          label="Mobile"
          onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
        />

        {profile.customFields.length ? renderCustomFields : null}
        <CustomButton addfieldbutton onClick={handleAddFieldButtonClicked}>
          ADD FIELD
        </CustomButton>
      </FormContainer>
      {!hideNewFieldForm ? (
        <NewField
          pushToProfile={(field) => {
            const fields = profile.customFields;
            setProfile({
              ...profile,
              customFields: [...fields, field],
            });
            toggleHideNewFieldForm(true);
          }}
          cancelAction={() => toggleHideNewFieldForm(true)}
        />
      ) : null}
      <ButtonsContainer>
        <CustomButton
          createbutton
          onClick={handleCreateButtonClicked}
          disabled={!profile.name}
        >
          CREATE
        </CustomButton>
        <CustomButton cancelbutton onClick={handleCancelButtonClicked}>
          CANCEL
        </CustomButton>
      </ButtonsContainer>
    </NewClientFormPageContainer>
  );
};

export default NewClientForm;
