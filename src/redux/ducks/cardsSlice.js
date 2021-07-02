import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "Bruce Wein",
    createdAt: "2019-10-09",
  },
  {
    id: "2",
    name: "Harley Quinn",
    createdAt: "2020-04-07",
  },
  {
    id: "3",
    name: "Sally Brown",
    createdAt: "2020-04-07",
  },
  {
    id: "4",
    name: "Blah Who's who",
    createdAt: "2020-04-07",
  },
];
const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    createCard(state, action) {
      state.push(action.payload);
    },
    prepare(name, address, isVirtual) {
      return {
        payload: {
          id: nanoid(),
          createdAt: new Date().toISOString(),
          name,
          address,
          isVirtual,
        },
      };
    },
  },
});

export default cardsSlice.reducer;
