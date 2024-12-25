import { SET_CONTACT } from "./actiontype";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_CONTACT:
      return action.payload;
    default:
      return state;
  }
};
