import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCard, addField } from "../../redux/ducks/cardsSlice";
import { useHistory } from "react-router-dom";

import CustomButton from "../CustomButtom/CustomButton.component";
import FormInput from "../FormInput/FormInput.component";

import {
  PageContainer,
  CardDetailContainer,
  NameContainer,
  NormalTextContainer,
  SmallTextContainer,
  ConfirmDeleteContainer,
  InteractionsContainer,
  CustomFieldContainer,
} from "./card-detail.styles";

const CardDetail = ({ match }) => {
  const { cardId } = match.params;
  const card = useSelector((state) =>
    state.cards.find((card) => card.meta.id === cardId)
  );

  const dispatch = useDispatch();

  const history = useHistory();

  const [hideConfirmBox, setHideConfirmBox] = useState(true);
  const [confirmName, setConfirmName] = useState("");
  const [hideCustomField, toggleHideCustomField] = useState(true);

  const [field, setField] = useState({
    name: "",
    type: "",
    value: "",
  });

  const handleDeleteButtonClick = () => {
    setHideConfirmBox(false);
  };

  const handleConfirmDelete = () => {
    if (confirmName === card.profile.name) {
      dispatch(deleteCard(cardId));
      history.push("/");
    } else {
      window.alert("Unmatching name, delete failed");
    }
  };

  const handleEditButtonClick = () => {
    console.log("edit needed");
  };

  const handleAddFieldClicked = () => {
    dispatch(addField({ field, cardId }));
    toggleHideCustomField(true);
    setField({
      name: "",
      type: "",
      value: "",
    });
  };

  const renderData = (data) => {
    return Object.entries(data).map(([k, v]) =>
      k !== "customFields" ? (
        <NormalTextContainer key={k}>
          {`${k.toUpperCase()}: ${v}`}
        </NormalTextContainer>
      ) : (
        v.map((field) => (
          <NormalTextContainer key={field.name}>
            {`${field.name.toUpperCase()}: ${field.value}`}
          </NormalTextContainer>
        ))
      )
    );
  };

  // const renderAddField = (
  //   <CustomFieldContainer>
  //     <FormInput
  //       type="text"
  //       value={field.name}
  //       name="name"
  //       onChange={(e) => setField({ ...field, name: e.target.value })}
  //       label="Field Name"
  //     />
  //     <select
  //       name="type"
  //       onChange={(e) => setField({ ...field, type: e.target.value })}
  //     >
  //       <option value="text" defaultValue>
  //         Text
  //       </option>
  //       <option value="number">Number</option>
  //       <option value="tel">Phone</option>
  //       <option value="email">Email</option>
  //       <option value="date">date</option>
  //     </select>
  //     <FormInput
  //       type={field.type}
  //       value={field.value}
  //       name="value"
  //       onChange={(e) => setField({ ...field, value: e.target.value })}
  //       label={field.type === "date" ? null : "Value"}
  //     />

  //     {field.name.length && field.value.length ? (
  //       <CustomButton addbutton onClick={handleAddFieldClicked}>
  //         Add
  //       </CustomButton>
  //     ) : null}
  //   </CustomFieldContainer>
  // );

  if (card) {
    const { createdAt } = card.meta;
    const { name, ...otherFields } = card.profile;
    return (
      <PageContainer>
        <CardDetailContainer>
          <NameContainer>{name}</NameContainer>
          <SmallTextContainer>
            created at: {createdAt.slice(0, 10)}
          </SmallTextContainer>
          {renderData(otherFields)}
          {/* {hideCustomField ? null : renderAddField} */}
          {/* {
            <CustomButton
              addbutton
              onClick={() => toggleHideCustomField(false)}
            >
              Add Field
            </CustomButton>
          } */}
        </CardDetailContainer>
        {!hideConfirmBox ? (
          <ConfirmDeleteContainer>
            <FormInput
              type="text"
              onChange={(e) => setConfirmName(e.target.value)}
              label={"Enter Client Name"}
              value={confirmName}
            />
            <InteractionsContainer>
              <CustomButton deletebutton onClick={handleConfirmDelete}>
                Confirm
              </CustomButton>
              <CustomButton
                cancelbutton
                onClick={() => setHideConfirmBox(true)}
              >
                Cancel
              </CustomButton>
            </InteractionsContainer>
          </ConfirmDeleteContainer>
        ) : (
          <InteractionsContainer>
            <CustomButton deletebutton onClick={handleDeleteButtonClick}>
              DELETE
            </CustomButton>
            <CustomButton editbutton onClick={handleEditButtonClick}>
              EDIT
            </CustomButton>
          </InteractionsContainer>
        )}
      </PageContainer>
    );
  }

  return <h1>No card {cardId}</h1>;
};

export default CardDetail;
