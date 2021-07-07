import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];
// {
//  meta: { }
//  profile: {...,customField:[]},
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
  },
});

export const { createCard, deleteCard } = cardsSlice.actions;

export default cardsSlice.reducer;
