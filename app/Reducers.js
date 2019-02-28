import { WEATHER_SUCCESS, WEATHER_FETCH, WEATHER_ERROR } from "./actions";
import { combineReducers } from "redux";

weatherData = {
  isFetching: false,
  name: "",
  weather: [
    {
      description: ""
    }
  ],
  main: {
    temp: null,
    presure: null,
    humidity: null,
    temp_min: null,
    temp_max: null
  },
  sys: {
    sunrise: null,
    sunset: null
  },
  visibility: null,
  dt: null,
  wind: null,
  clouds: { all: null }
};

function weather(state = weatherData, action) {
  switch (action.type) {
    case WEATHER_FETCH:
      return { ...state, isFetching: true };
    case WEATHER_SUCCESS:
      return { ...state, isFetching: false, ...action.payload };
    case WEATHER_ERROR:
      console.log(action.payload);
      return { ...state, isFetching: false };
    default:
      return state;
  }
}

const reducers = combineReducers({
  weather
});

export default reducers;
