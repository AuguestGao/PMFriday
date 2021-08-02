import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "pending",
  data: {},
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    loadCards(state, action) {
      if (!action.payload) {
        return { ...state, status: "loaded" };
      } else {
        return { status: "loaded", data: { ...action.payload } };
      }
    },

    changeCardStatus(state, action) {
      return { ...state, status: action.payload };
    },

    clearCards(state, action) {
      return {
        status: "pending",
        data: {},
      };
    },

    claimTime(state, action) {
      const { cardId, timeId, newUsed } = action.payload;
      state.data[cardId]["times"][timeId]["used"] += Number(newUsed);
    },

    addNew(state, action) {
      const { cardId, target, data } = action.payload;
      const existingCard = state.data[cardId];
      if (existingCard) {
        switch (target) {
          case "profile":
            existingCard.profile = data;
            break;
          case "times":
            existingCard.times = data;
            break;
          case "todos":
            existingCard.todos.push(data);
            break;
          default:
            return;
        }
      }
    },

    autoSaveNote(state, action) {
      const { cardId, note } = action.payload;
      const existingCard = state.data[cardId];
      if (existingCard) {
        existingCard.note = { ...note };
      }
    },

    toggleTodo(state, action) {
      const { cardId, todoId } = action.payload;
      const existingCard = state.data[cardId];
      if (existingCard) {
        const existingTodo = existingCard.todos.find(
          (todo) => todo.id === todoId
        );
        if (existingTodo) {
          existingTodo.isDone = !existingTodo.isDone;
        }
      }
    },

    removeATodo(state, action) {
      const { cardId, todoId } = action.payload;
      const existingCard = state.data[cardId];
      if (existingCard) {
        existingCard.todos = [
          ...existingCard.todos.filter((todo) => todo.id !== todoId),
        ];
      }
    },

    autoSaveTodos(state, action) {
      const { cardId, todos } = action.payload;
      const existingCard = state.data[cardId];
      if (existingCard) {
        existingCard.todos = [...todos];
      }
    },
  },
});

export const mapObj2Arr = (obj) => {
  return Object.keys(obj).reduce(
    (accumulator, cardId) => [...accumulator, { cardId, ...obj[cardId] }],
    []
  );
};

export const {
  loadCards,
  changeCardStatus,
  clearCards,
  addNew,
  toggleTodo,
  autoSaveNote,
  removeATodo,
  autoSaveTodos,
  claimTime,
} = cardsSlice.actions;

export default cardsSlice.reducer;
