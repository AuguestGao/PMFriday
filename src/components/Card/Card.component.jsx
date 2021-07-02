import React from "react";
import { CardLinkContainer, CardContainer } from "./Card.styles";
// import { withRouter } from "react-router-dom";

const Card = ({ id, name, createdAt }) => {
  return (
    <CardLinkContainer to={`/cards/${id}`}>
      <CardContainer>
        <span className="name">{name}</span>
        <span>{createdAt}</span>
      </CardContainer>
    </CardLinkContainer>
  );
};

export default Card;
