import { WEATHER_SUCCESS, WEATHER_FETCH, WEATHER_ERROR } from "./actions";
import { combineReducers } from "redux";

const weatherData = {
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
  clouds: { all: null },
  list: [],
  hourList: []
};

function weather(state = weatherData, action) {
  switch (action.type) {
    case WEATHER_FETCH:
      return { ...state, isFetching: true };
    case WEATHER_SUCCESS:
      if (action.payload.list) {
        action.payload.hourList = action.payload.list.slice(0, 8);
        action.payload.hourList.unshift({
          dt: state.dt,
          main: state.main,
          weather: state.weather
        });

        let simplerList = [];
        for (let i = 8; i < action.payload.list.length; i = i + 8) {
          simplerList.push(action.payload.list[i]);
        }
        action.payload.list = simplerList;
      }
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
