import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];
// {
//  meta: { }
//  profile: {...,customField:[]},
//  times: [{}, {}, {}],
//  note: '',
//  todos: [{}, {}]
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
            times: [],
            note: "",
            todos: { actives: [], completions: [] },
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

    addNew(state, action) {
      const { cardId, target, data } = action.payload;
      const existingCard = state.find((card) => card.meta.id === cardId);
      if (existingCard) {
        switch (target) {
          case "profile":
            existingCard.profile.customFields.push(data);
            break;
          case "times":
            existingCard.times.push(data);
            break;
          case "todos":
            break;
          default:
            return;
        }
      }
    },

    claimTime(state, action) {
      const { cardId, timeId, timeValue } = action.payload;
      const existingCard = state.find((card) => card.meta.id === cardId);
      if (existingCard) {
        const existingTime = existingCard.times.find(
          (time) => time.id === timeId
        );
        if (existingTime) {
          existingTime.used = Number(existingTime.used) + Number(timeValue);
        }
      }
    },

    updateOld(state, action) {
      const { cardId, target, data } = action.payload;
      const existingCard = state.find((card) => card.meta.id === cardId);
      if (existingCard) {
        switch (target) {
          case "profile":
            break;
          case "times":
            existingCard.times.push(data);
            break;
          case "todos":
            break;
          default:
            return;
        }
      }
    },

    remove(state, payload) {},
  },
});

export const { createCard, deleteCard, addNew, claimTime } = cardsSlice.actions;

export default cardsSlice.reducer;
