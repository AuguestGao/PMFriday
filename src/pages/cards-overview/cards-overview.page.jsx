import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import CardPreview from "../../components/Card-Preview/Card-Preview.component";
import ProfileForm from "../../components/Forms/ProfileForm.component";
import Search from "../../components/Search/Search.component";
import CustomButton from "../../components/CustomButtom/CustomButton.component";
import { firestore } from "../../firebase/firebase";

import {
  loadCards,
  changeCardStatus,
  mapObj2Arr,
} from "../../redux/ducks/cardsSlice";

import {
  PageWrapper,
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

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllCards = async () => {
      const cardsCollectionRef = firestore.collection(
        `users/${currentUser.id}/cards`
      );

      const cardsCollectionSnapshot = await cardsCollectionRef.get();
      const cardsCollection = {};
      cardsCollectionSnapshot.forEach((doc) => {
        cardsCollection[doc.id] = doc.data();
      });

      console.log(cardsCollection);
      if (_.isEmpty(cardsCollection)) {
        dispatch(loadCards(null));
      } else {
        dispatch(loadCards(cardsCollection));
      }
    };

    if (!_.isEmpty(currentUser)) {
      getAllCards();
    }
  }, [cardStatus, currentUser, dispatch]);

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSaveProfile = () => {
    toggleProfileForm(!showProfileForm);
    dispatch(changeCardStatus("loaded"));
  };

  const renderFilteredCards = () => {
    const cardsArr = mapObj2Arr(cards);
    const filteredCards = cardsArr.filter((card) =>
      card.profile.name.toLowerCase().includes(searchValue.toLowerCase())
        ? card
        : null
    );

    return filteredCards.length ? (
      filteredCards.map((card) => <CardPreview key={card.cardId} {...card} />)
    ) : (
      <NoRecordContainer>No record found...</NoRecordContainer>
    );
  };

  return (
    <PageWrapper>
      {showProfileForm ? null : (
        <p className="user-name">
          Welcome, <span> {currentUser.displayName}</span>
        </p>
      )}
      {cards.status === "pending" ? (
        <h1>loading... please wait</h1>
      ) : showProfileForm ? (
        <ProfileForm
          saveProfile={handleSaveProfile}
          cancelSaveProfile={() => toggleProfileForm(!showProfileForm)}
        />
      ) : (
        <React.Fragment>
          <SearchAndAddContainer>
            <Search
              searchValue={searchValue}
              handleSearchInputChange={handleSearchInputChange}
            />
            <CustomButton
              button
              onClick={() => toggleProfileForm(!showProfileForm)}
            >
              NEW
            </CustomButton>
          </SearchAndAddContainer>
          <CardsOverviewContainer>
            {renderFilteredCards()}
          </CardsOverviewContainer>
        </React.Fragment>
      )}
    </PageWrapper>
  );
};

export default CardsOverview;
