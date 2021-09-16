import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { firestore } from "../../firebase/firebase";

import FormInput from "../FormInput/FormInput.component";
import CustomButton from "../CustomButtom/CustomButton.component";
import NewField from "../NewField/NewField.component";
import { changeCardStatus, addNew } from "../../redux/ducks/cardsSlice";

import {
  FormPageContainer,
  FormContainer,
  ButtonsContainer,
} from "./Forms.styles";

const ProfileForm = ({ saveProfile, cancelSaveProfile, cardData, cardId }) => {
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

  const [error, setError] = useState("");

  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const resetState = () =>
    setProfile({
      name: "",
      address: "",
      email: "",
      mobile: "",
      customFields: {},
    });

  const handleSaveProfileClicked = async (e) => {
    e.preventDefault();

    if (isNewProfile) {
      try {
        await firestore.collection(`users/${userId}/cards`).add({
          profile,
          times: {},
          todos: [],
          note: {},
          addedAt: new Date().toISOString(),
        });
        dispatch(changeCardStatus({ status: "loading" }));
      } catch (err) {
        setError(err.message);
      }
    } else {
      dispatch(addNew({ cardId, target: "profile", data: profile }));
    }
    saveProfile();
    resetState();
  };

  const handleCancelButtonClicked = () => {
    resetState();
    cancelSaveProfile();
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
    <FormPageContainer>
      <FormContainer>
        <h2>New Profile</h2>
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
                <div
                  className="delete-entry"
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveFieldClicked}
                >
                  &#x2716;
                </div>
              </div>
            ))}
        <NewField
          isProfile
          addToProfile={(props) => {
            const { id, ...otherProps } = props;
            setProfile({
              ...profile,
              customFields: {
                ...profile.customFields,
                [id]: { ...otherProps },
              },
            });
          }}
          onChange={handleCustomFieldChange}
        />
      </FormContainer>
      <ButtonsContainer>
        <CustomButton
          button
          onClick={handleSaveProfileClicked}
          disabled={!profile.name}
        >
          Confirm
        </CustomButton>
        <CustomButton button onClick={handleCancelButtonClicked}>
          CANCEL
        </CustomButton>
      </ButtonsContainer>
    </FormPageContainer>
  );
};

export default ProfileForm;
