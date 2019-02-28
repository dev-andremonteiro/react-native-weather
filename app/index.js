import React from "react";

import storage from "redux-persist/lib/storage";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistReducer, persistStore } from "redux-persist";
import { createLogger } from "redux-logger";
import Thunk from "redux-thunk";

import Reducers from "./Reducers";
import Router from "./Router";
import { fetchWeatherData } from "./actions";

const Logger = createLogger();

const persistConfig = {
  key: "root",
  storage: storage
};
const persistedReducer = persistReducer(persistConfig, Reducers);

const initialState = {};

const store = createStore(Reducers, applyMiddleware(Thunk, Logger));

store.dispatch(fetchWeatherData("3465038"));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentWillMount() {
    let persistor = persistStore(store, {}, () =>
      this.setState({ store, persistor, isLoading: false })
    );
  }

  render() {
    if (this.state.isLoading) return null;
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
