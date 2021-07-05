import React from "react";
import { useSelector } from "react-redux";

import CustomButton from "../CustomButtom/CustomButton.component";

const CardDetail = ({ match }) => {
  const { cardId } = match.params;
  const card = useSelector((state) =>
    state.cards.find((card) => card.id === cardId)
  );

  const handleDeleteButtonClick = (e) => {
    console.log(e.target);
  };

  if (card) {
    const { id, name, createdAt } = card;
    return (
      <div>
        <h1>{name}</h1>
        <h6>created at: {createdAt.slice(0, 10)}</h6>
        <span>id: {id}</span>
        <CustomButton deletebutton onClick={handleDeleteButtonClick}>
          DELETE
        </CustomButton>
      </div>
    );
  }
  return <h1>no card {cardId}</h1>;
};

export default CardDetail;
