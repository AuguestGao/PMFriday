import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  // currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      // console.log(action.payload); // temp
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;