import React from "react";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./configureStore";

import Router from "./Router";
/*
const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
Testing to see if graph is working
*/

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
