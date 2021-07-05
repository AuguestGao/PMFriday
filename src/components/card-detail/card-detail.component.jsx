import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCard } from "../../redux/ducks/cardsSlice";
import { useHistory } from "react-router-dom";

import CustomButton from "../CustomButtom/CustomButton.component";
import FormInput from "../FormInput/FormInput.component";

import {
  CardDetailContainer,
  NameContainer,
  NormalTextContainer,
  SmallTextContainer,
  ConfirmDeleteContainer,
} from "./card-detail.styles";

const CardDetail = ({ match }) => {
  const { cardId } = match.params;
  const card = useSelector((state) =>
    state.cards.find((card) => card.id === cardId)
  );

  const dispatch = useDispatch();

  const history = useHistory();

  const [hideConfirmBox, setHideConfirmBox] = useState(true);
  const [confirmName, setConfirmName] = useState("");

  const handleDeleteButtonClick = () => {
    setHideConfirmBox(false);
  };

  // const handleConfirmNameChange = (e) => {
  //   setConfirmName(e.target.value);
  // };

  const handleConfirmDelete = () => {
    if (confirmName === card.name) {
      dispatch(deleteCard(cardId));
      history.push("/");
    } else {
      window.alert("Unmatching name, delete failed");
    }
  };

  if (card) {
    const { name, createdAt, address, email, phone } = card;
    return (
      <CardDetailContainer>
        <NameContainer>{name}</NameContainer>
        <SmallTextContainer>
          created at: {createdAt.slice(0, 10)}
        </SmallTextContainer>
        <NormalTextContainer>Address: {address}</NormalTextContainer>
        <NormalTextContainer>Email: {email}</NormalTextContainer>
        <NormalTextContainer>Phone: {phone}</NormalTextContainer>

        {!hideConfirmBox ? (
          <ConfirmDeleteContainer>
            <FormInput
              type="text"
              onChange={(e) => setConfirmName(e.target.value)}
              label={"Enter Client Name"}
              value={confirmName}
            />

            <CustomButton deletebutton onClick={handleConfirmDelete}>
              Confirm Delete
            </CustomButton>
          </ConfirmDeleteContainer>
        ) : (
          <CustomButton deletebutton onClick={handleDeleteButtonClick}>
            DELETE
          </CustomButton>
        )}
      </CardDetailContainer>
    );
  }
  return <h1>no card {cardId}</h1>;
};

export default CardDetail;
