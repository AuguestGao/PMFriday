import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  // {
  //   id: "1",
  //   name: "Bruce Wein",
  //   createdAt: "2019-10-09",
  // },
  // {
  //   id: "2",
  //   name: "Harley Quinn",
  //   createdAt: "2020-04-07",
  // }
];
const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    createCard: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(file) {
        const { name, address, email } = file;
        return {
          payload: {
            id: nanoid(),
            createdAt: new Date().toISOString(),
            isArchived: false,
            name,
            address,
            email,
          },
        };
      },
    },
  },
});

export const { createCard } = cardsSlice.actions;

export default cardsSlice.reducer;
