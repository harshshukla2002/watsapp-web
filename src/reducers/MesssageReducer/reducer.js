import { ADD_MESSAGE, SET_MESSAGE } from "./actiontype";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, [action.contact]: action.payload };
    case ADD_MESSAGE:
      return {
        ...state,
        [action.contact]: [...(state[action.contact] || []), action.payload],
      };
    default:
      return state;
  }
};
