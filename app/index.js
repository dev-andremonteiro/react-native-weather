import React from "react";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import Thunk from "redux-thunk";

import Reducers from "./Reducers";
import Router from "./Router";

const Logger = createLogger({
  predicate: (getState, action) => __DEV__,
  collapsed: true,
  duration: true
});

const store = createStore(Reducers, applyMiddleware(Thunk, Logger));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  persistStore = (store, callback) => {};

  _setStore = async h => {
    await AsyncStorage.setItem("store", JSON.stringify(h));
  };

  _getStore = async () => {
    const hist = await AsyncStorage.getItem("store").then(req =>
      JSON.parse(req)
    );
    return hist;
  };

  componentWillMount() {
    /**persistStore(store, () =>
      this.setState({ store, persistor, isLoading: false })
    ); */
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
