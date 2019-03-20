import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";

import Thunk from "redux-thunk";

import Reducers from "./reducers";

const Logger = createLogger({
  predicate: (getState, action) => __DEV__,
  collapsed: true,
  duration: true
});

const persistConfig = {
  key: "root3",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, Reducers);

export const store = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(Thunk, Logger)
);

export const persistor = persistStore(store);
