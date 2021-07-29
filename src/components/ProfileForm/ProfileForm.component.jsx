import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";
import NewField from "../NewField/NewField.component";
import { firestore } from "../../firebase/firebase";
import { changeCardStatus } from "../../redux/ducks/cardsSlice";

import {
  ProfileFormPageContainer,
  FormContainer,
  ButtonsContainer,
} from "./ProfileForm.styles";

const ProfileForm = ({ saveProfile, cancelCreateProfile, cardData }) => {
  const isNewProfile = _.isEmpty(cardData);
  const [profile, setProfile] = useState(() => {
    return isNewProfile
      ? {
          name: "",
          address: "",
          email: "",
          mobile: "",
          customFields: {},
        }
      : {
          name: cardData.name,
          address: cardData.address,
          email: cardData.email,
          mobile: cardData.mobile,
          customFields: { ...cardData.customFields },
        };
  });

  const [hideNewFieldForm, toggleHideNewFieldForm] = useState(true);
  const [error, setError] = useState("");

  const userId = useSelector((state) => state.user.id);
  const history = useHistory();
  const dispatch = useDispatch();

  const resetState = () =>
    setProfile({
      name: "",
      address: "",
      email: "",
      mobile: "",
      customFields: {},
    });

  const handleAddFieldClicked = (e) => {
    e.preventDefault();
    toggleHideNewFieldForm(false);
  };

  const handleSaveProfileClicked = async (e) => {
    e.preventDefault();
    try {
      isNewProfile
        ? await firestore.collection(`users/${userId}/cards`).add({
            profile,
            times: {},
            todos: [],
            note: "",
            addedAt: new Date().toISOString(),
          })
        : await firestore
            .doc(`users/${userId}/cards/${cardData.id}`)
            .update({ profile: profile });
      dispatch(changeCardStatus("loading"));
      saveProfile();
      // console.log(cardDocRef.id);
    } catch (err) {
      setError(err.message);
    }

    resetState();
    history.push("/");
  };

  const handleCancelButtonClicked = () => {
    resetState();
    cancelCreateProfile();
  };

  const handleCustomFieldChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      customFields: {
        ...profile.customFields,
        [name]: { ...profile.customFields[name], value: value },
      },
    });
  };

  const handleRemoveFieldClicked = (e) => {
    // e.preventDefault();
    const key = e.target.parentNode.id;
    const modifiedCustomFields = _.cloneDeep(profile.customFields);
    delete modifiedCustomFields[key];
    setProfile({
      ...profile,
      customFields: {
        ...modifiedCustomFields,
      },
    });
  };

  return (
    <ProfileFormPageContainer>
      <FormContainer>
        <h2>Client Profile</h2>
        {error ? error : null}
        <FormInput
          type="text"
          name="name"
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

        {_.isEmpty(profile.customFields)
          ? null
          : Object.entries(profile.customFields).map(([k, v]) => (
              <div
                className="d-flex flex-row justify-content-between
              align-items-center"
                key={k}
                id={k}
              >
                <FormInput
                  name={k}
                  type={v.type}
                  value={v.value}
                  label={v.name}
                  onChange={handleCustomFieldChange}
                />
                <div className="text-white" onClick={handleRemoveFieldClicked}>
                  &#x2716;
                </div>
              </div>
            ))}

        {!hideNewFieldForm ? (
          <NewField
            addToProfile={(props) => {
              const { id, ...otherProps } = props;
              setProfile({
                ...profile,
                customFields: {
                  ...profile.customFields,
                  [id]: { ...otherProps },
                },
              });
              toggleHideNewFieldForm(true);
            }}
            onChange={handleCustomFieldChange}
            cancelAction={() => toggleHideNewFieldForm(true)}
          />
        ) : null}
        <CustomButton addfieldbutton onClick={handleAddFieldClicked}>
          ADD FIELD
        </CustomButton>
      </FormContainer>
      <ButtonsContainer>
        <CustomButton
          createbutton
          onClick={handleSaveProfileClicked}
          disabled={!profile.name}
        >
          Save
        </CustomButton>
        <CustomButton cancelbutton onClick={handleCancelButtonClicked}>
          CANCEL
        </CustomButton>
      </ButtonsContainer>
    </ProfileFormPageContainer>
  );
};

export default ProfileForm;
