import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import recipesCardsReducer from "./recipesCards.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  recipesCards: recipesCardsReducer
});

