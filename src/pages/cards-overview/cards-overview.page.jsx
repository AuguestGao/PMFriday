import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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

  const history = useHistory();

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredCards = cards.filter(
    (card) =>
      !card.meta.isArchived &&
      card.profile.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderFilteredCards = () =>
    filteredCards.length ? (
      filteredCards.map((card) => <Card key={card.meta.id} {...card} />)
    ) : (
      <NoRecordContainer>no record found...</NoRecordContainer>
    );

  return (
    <React.Fragment>
      <SearchAndAddContainer>
        <Search searchValue={searchValue} handleChange={handleChange} />
        {/* <Link to="/add"> */}
        <CustomButton addbutton onClick={() => history.push("/add")}>
          ADD
        </CustomButton>
        {/* </Link> */}
      </SearchAndAddContainer>
      <CardsOverviewContainer>{renderFilteredCards()}</CardsOverviewContainer>
    </React.Fragment>
  );
};

export default CardsOverview;
