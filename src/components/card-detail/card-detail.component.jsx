import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCard } from "../../redux/ducks/cardsSlice";
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

  const handleConfirmDelete = () => {
    if (confirmName === card.name) {
      dispatch(deleteCard(cardId));
      history.push("/");
    } else {
      window.alert("Unmatching name, delete failed");
    }
  };

  const handelEditButtonClick = () => {
    console.log("edit needed");
  };

  if (card) {
    const { name, createdAt, address, email, phone } = card;
    return (
      <PageContainer>
        <CardDetailContainer>
          <NameContainer>{name}</NameContainer>
          <SmallTextContainer>
            created at: {createdAt.slice(0, 10)}
          </SmallTextContainer>
          <NormalTextContainer>Address: {address}</NormalTextContainer>
          <NormalTextContainer>Email: {email}</NormalTextContainer>
          <NormalTextContainer>Phone: {phone}</NormalTextContainer>
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
            <CustomButton editbutton onClick={handelEditButtonClick}>
              Edit
            </CustomButton>
          </InteractionsContainer>
        )}
      </PageContainer>
    );
  }

  return <h1>No card {cardId}</h1>;
};

export default CardDetail;
