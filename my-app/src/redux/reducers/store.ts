import { combineReducers, createStore } from 'redux';

import { persistReducer, persistStore } from 'redux-persist';
import userReducer from "./user.reducer";
import recipesCardsReducer from "./recipesCards.reducer";
import storage from 'redux-persist/lib/storage'



const rootReducer = combineReducers({
  user: userReducer,
  recipesCards: recipesCardsReducer
});

const persistConfig = {
  key: 'key',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  // @ts-ignore
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);