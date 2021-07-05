import React from "react";
import { useSelector } from "react-redux";

import CustomButton from "../CustomButtom/CustomButton.component";

import {
  CardDetailContainer,
  NameContainer,
  NormalTextContainer,
  SmallTextContainer,
} from "./card-detail.styles";

const CardDetail = ({ match }) => {
  const { cardId } = match.params;
  const card = useSelector((state) =>
    state.cards.find((card) => card.id === cardId)
  );

  const handleDeleteButtonClick = (e) => {
    console.log(e.target);
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

        <CustomButton deletebutton onClick={handleDeleteButtonClick}>
          DELETE
        </CustomButton>
      </CardDetailContainer>
    );
  }
  return <h1>no card {cardId}</h1>;
};

export default CardDetail;
