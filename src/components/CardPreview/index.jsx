import React from "react";
import { CardLinkContainer, CardContainer } from "./styled";

export const CardPreview = ({ cardId, addedAt, profile }) => {
  const { name } = profile;
  return (
    <CardLinkContainer to={`/card/${cardId}`}>
      <CardContainer>
        <span className="name">{name}</span>
        <span>{addedAt.slice(0, 10)}</span>
      </CardContainer>
    </CardLinkContainer>
  );
};
