import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Card from "../../components/Card/Card.component";
import Search from "../../components/Search/Search.component";
import CustomButton from "../../components/CustomButtom/CustomButton.component";

import {
  CardsOverviewContainer,
  NoRecordContainer,
  SearchAndAddContainer,
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
      filteredCards.map((card) =>
        !card.isArchived ? <Card key={card.id} {...card} /> : null
      )
    ) : (
      <NoRecordContainer>
        ooops...
        <br />
        no record found
      </NoRecordContainer>
    );

  return (
    <React.Fragment>
      <SearchAndAddContainer>
        <Search searchValue={searchValue} handleChange={handleChange} />
        <Link to="/add">
          <CustomButton addbutton>ADD</CustomButton>
        </Link>
      </SearchAndAddContainer>
      <CardsOverviewContainer>{renderFilteredCards()}</CardsOverviewContainer>
    </React.Fragment>
  );
};

export default CardsOverview;
