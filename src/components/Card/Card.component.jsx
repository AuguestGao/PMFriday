import React from "react";
import { CardLinkContainer, CardContainer } from "./Card.styles";

const Card = ({ meta, profile }) => {
  const { id, createdAt } = meta;
  const { name } = profile;
  return (
    <CardLinkContainer to={`/cards/${id}`}>
      <CardContainer>
        <span className="name">{name}</span>
        <span>{createdAt.slice(0, 10)}</span>
      </CardContainer>
    </CardLinkContainer>
  );
};

export default Card;
