import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];
// {
//  profile: [{}, {}, {}],
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
      const existingCard = state.find((card) => card.id === action.payload);
      if (existingCard) {
        existingCard.isArchived = true;
      }
    },
  },
});

export const { createCard, deleteCard } = cardsSlice.actions;

export default cardsSlice.reducer;
