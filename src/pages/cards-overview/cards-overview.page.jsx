import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import CardPreview from "../../components/Card-Preview/Card-Preview.component";
import ProfileForm from "../../components/ProfileForm/ProfileForm.component";
import Search from "../../components/Search/Search.component";
import CustomButton from "../../components/CustomButtom/CustomButton.component";
import { firestore } from "../../firebase/firebase";

import {
  loadCards,
  changeCardStatus,
  mapObj2Arr,
} from "../../redux/ducks/cardsSlice";

import {
  CardsOverviewContainer,
  NoRecordContainer,
  SearchAndAddContainer,
} from "./cards-overview.styles";

const CardsOverview = () => {
  const currentUser = useSelector((state) => state.user);
  const cards = useSelector((state) => state.cards.data);
  const [searchValue, setSearchValue] = useState("");
  const [showProfileForm, toggleProfileForm] = useState(false);
  const cardStatus = useSelector((state) => state.cards.status);

  const history = useHistory();
  const dispatch = useDispatch();

  const getAllCards = async (userId) => {
    const cardsCollectionRef = firestore.collection(`users/${userId}/cards`);
    const cardsCollectionSnapshot = await cardsCollectionRef.get();
    const cardsCollection = {};
    cardsCollectionSnapshot.forEach((doc) => {
      cardsCollection[doc.id] = doc.data();
    });
    if (_.isEmpty(cardsCollection)) {
      dispatch(loadCards(null));
    } else {
      dispatch(loadCards(cardsCollection));
    }
  };

  useEffect(() => {
    getAllCards(currentUser.id);
  }, [cardStatus]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSaveProfile = () => {
    toggleProfileForm(!showProfileForm);
    dispatch(changeCardStatus("loaded"));
  };

  const renderFilteredCards = () => {
    const cardsArr = mapObj2Arr(cards);
    const filteredCards = cardsArr.map((card) =>
      card.profile.name.toLowerCase().includes(searchValue.toLowerCase())
        ? card
        : null
    );

    return filteredCards.length ? (
      filteredCards.map((card) => <CardPreview key={card.cardId} {...card} />)
    ) : (
      <NoRecordContainer>all cards perished</NoRecordContainer>
    );
  };

  return (
    <div>
      {cards.status === "pending" ? (
        <h1>loading... please wait</h1>
      ) : showProfileForm ? (
        <ProfileForm
          saveProfile={handleSaveProfile}
          cancelCreateProfile={() => toggleProfileForm(!showProfileForm)}
        />
      ) : (
        <React.Fragment>
          <SearchAndAddContainer>
            <Search searchValue={searchValue} handleChange={handleChange} />
            <CustomButton
              addbutton
              onClick={() => toggleProfileForm(!showProfileForm)}
            >
              +
            </CustomButton>
          </SearchAndAddContainer>
          <CardsOverviewContainer>
            {renderFilteredCards()}
          </CardsOverviewContainer>
        </React.Fragment>
      )}
    </div>
  );
};

export default CardsOverview;
