import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];
// {
//  meta: { }
//  profile: {...},
//  ot: [{}, {}, {}],
//  note: '',
//  todo: [{}, {}]
// }

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    createCard: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(profile) {
        return {
          payload: {
            meta: {
              id: nanoid(),
              createdAt: new Date().toISOString(),
              isArchived: false,
            },
            profile,
          },
        };
      },
    },

    deleteCard(state, action) {
      const existingCard = state.find(
        (card) => card.meta.id === action.payload
      );
      if (existingCard) {
        existingCard.meta.isArchived = true;
      }
    },

    addField(state, action) {
      const { cardId, field } = action.payload;
      const existingCard = state.find((card) => card.meta.id === cardId);
      if (existingCard) {
        if (!existingCard.profile.hasOwnProperty("customFields")) {
          existingCard.profile.customFields = [field];
        } else {
          existingCard.profile.customFields.push(field);
        }
      }
    },
  },
});

export const { createCard, deleteCard, addField } = cardsSlice.actions;

export default cardsSlice.reducer;
