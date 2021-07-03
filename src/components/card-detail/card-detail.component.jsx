import React from "react";
import { useSelector } from "react-redux";

const CardDetail = ({ match }) => {
  const { cardId } = match.params;
  const card = useSelector((state) =>
    state.cards.find((card) => card.id === cardId)
  );

  if (card) {
    const { id, name, createdAt } = card;
    const date = `${createdAt.getFullYear()}-${
      createdAt.getMonth() + 1
    }-${createdAt.getDate()}`;
    return (
      <div>
        <h1>{name}</h1>
        <h6>created at: {date}</h6>
        <span>id: {id}</span>
      </div>
    );
  }
  return <h1>no card {cardId}</h1>;
};

export default CardDetail;
