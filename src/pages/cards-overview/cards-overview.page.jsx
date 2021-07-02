import React, { useState } from "react";
import { useSelector } from "react-redux";

import Card from "../../components/Card/Card.component";
import Search from "../../components/Search/Search.component";

import {
  CardsOverviewContainer,
  NoRecordContainer,
} from "./cards-overview.styles";

const CardsOverview = () => {
  const cards = useSelector((state) => state.cards);

  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderFilteredCards = () =>
    filteredCards.length ? (
      filteredCards.map((card) => <Card key={card.id} {...card} />)
    ) : (
      <NoRecordContainer>
        ooops...
        <br />
        no record found
      </NoRecordContainer>
    );

  return (
    <React.Fragment>
      <Search searchValue={searchValue} handleChange={handleChange} />
      <CardsOverviewContainer>{renderFilteredCards()}</CardsOverviewContainer>
    </React.Fragment>
  );
};

export default CardsOverview;
