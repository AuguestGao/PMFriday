import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];
// {
//  meta: { }
//  profile: {...,customField:[]},
//  times: [{}, {}, {}],
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

    addTimes(state, action) {
      const { cardId, times } = action.payload;
      const existingCard = state.find((card) => card.meta.id === cardId);
      if (existingCard) {
        if (existingCard.hasOwnProperty("times")) {
          existingCard.times.push(...times);
        } else {
          existingCard["times"] = [...times];
        }
      }
    },
  },
});

export const { createCard, deleteCard, addTimes } = cardsSlice.actions;

export default cardsSlice.reducer;
