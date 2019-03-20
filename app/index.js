import React from "react";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./configureStore";

import WeatherForecast from "./WeatherForecast";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WeatherForecast />
      </PersistGate>
    </Provider>
  );
};

export default App;
