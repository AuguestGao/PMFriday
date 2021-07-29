import { createSlice, nanoid } from "@reduxjs/toolkit";
import { firestore } from "../../firebase/firebase";
// import _ from "lodash";

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
        //payload is empty
        // console.log(
        //   "in card slice (not action payload = true)",
        //   action.payload
        // );
        return { ...state, status: "loaded" };
      } else {
        // console.log(
        //   "in card slice  (not action payload = false):",
        //   action.payload
        // );
        return { status: "loaded", data: { ...action.payload } };
      }
    },

    changeCardStatus(state, action) {
      return { ...state, status: action.payload };
    },

    clearCards() {
      return {
        status: "pending",
        data: {},
      };
    },

    createCard: {
      reducer(state, action) {
        state.cards.data([]);
      },
      prepare({ profile, userId }) {
        return {
          payload: {
            userId,
            addedAt: new Date().toISOString(),
            isArchived: false,
            profile,
            times: {},
            todos: [],
            note: "",
          },
        };
      },
    },

    deleteCard(state, action) {
      const existingCard = state.data.find(
        (card) => card.meta.id === action.payload
      );
      if (existingCard) {
        existingCard.meta.isArchived = true;
      }
    },

    addNew(state, action) {
      const { cardId, target, data } = action.payload;
      const existingCard = state.data.find((card) => card.meta.id === cardId);
      const id = nanoid();
      if (existingCard) {
        switch (target) {
          case "profile":
            existingCard.profile.customFields.push(data);
            break;
          case "times":
            existingCard.times.push({ ...data, id });
            break;
          case "todos":
            existingCard.todos.push({ ...data, id });
            break;
          default:
            return;
        }
      }
    },

    claimTime(state, action) {
      const { cardId, timeId, timeValue } = action.payload;
      const existingCard = state.data.find((card) => card.meta.id === cardId);
      if (existingCard) {
        const existingTime = existingCard.times.find(
          (time) => time.id === timeId
        );
        if (existingTime) {
          existingTime.used = Number(existingTime.used) + Number(timeValue);
        }
      }
    },

    toggleTodo(state, action) {
      const { cardId, todoId } = action.payload;
      const existingCard = state.data.find((card) => card.meta.id === cardId);
      if (existingCard) {
        const existingTodo = existingCard.todos.find(
          (todo) => todo.id === todoId
        );
        if (existingTodo) {
          existingTodo.isDone = !existingTodo.isDone;
        }
      }
    },

    saveNote(state, action) {
      const { cardId, note } = action.payload;
      const existingCard = state.data.find((card) => card.meta.id === cardId);
      if (existingCard) {
        existingCard.note = { ...note };
      }
    },

    updateOld(state, action) {
      const { cardId, target, data } = action.payload;
      const existingCard = state.data.find((card) => card.meta.id === cardId);
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

    // remove(state, payload) {},
  },
});

export const mapObj2Arr = (obj) => {
  return Object.keys(obj).reduce(
    (accumulator, cardId) => [...accumulator, { cardId, ...obj[cardId] }],
    []
  );
};

export const addNew = async (userId, cardId, target, data) => {
  const id = nanoid();
  console.log(userId, cardId, target, data);
  try {
    const cardDocRef = firestore.doc(`users/${userId}/cards/${cardId}`);
    switch (target) {
      case "profile":
        await cardDocRef.profile.customFields.add({ [id]: data });
        // existingCard.profile.customFields.push(data);
        break;
      case "times":
        await cardDocRef.times.update({ [id]: data });
        // existingCard.times.push({ ...data, id });
        break;
      case "todos":
        await cardDocRef.update({
          todos: firestore.FieldValue.arrayUnion(data),
        });
        // existingCard.todos.push({ ...data, id });
        break;
      default:
        return;
    }
  } catch (err) {
    console.log("err adding new: ", err.message);
  }
};

export const {
  loadCards,
  changeCardStatus,
  clearCards,
  createCard,
  deleteCard,
  claimTime,
  toggleTodo,
  saveNote,
} = cardsSlice.actions;

export default cardsSlice.reducer;
