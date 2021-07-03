import React from "react";
import { CardLinkContainer, CardContainer } from "./Card.styles";

const Card = ({ id, name, createdAt }) => {
  const date = `${createdAt.getFullYear()}-${
    createdAt.getMonth() + 1
  }-${createdAt.getDate()}`;

  return (
    <CardLinkContainer to={`/cards/${id}`}>
      <CardContainer>
        <span className="name">{name}</span>
        <span>{date}</span>
      </CardContainer>
    </CardLinkContainer>
  );
};

export default Card;
