import { configureStore } from "@reduxjs/toolkit";

import cardsReducer from "./ducks/cardsSlice";
import userReducer from "./ducks/userSlice";

export default configureStore({
  reducer: {
    cards: cardsReducer,
    user: userReducer,
  },
});
