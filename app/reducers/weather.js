import { WEATHER_SUCCESS, WEATHER_FETCH, WEATHER_ERROR } from "../actions";
import { ADD_CITY, DELETE_CITY, CHANGE_PAGE } from "../actions";

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

citiesData = {
  page: 0,
  list: [
    {
      title: "Cuiabá",
      id: "3465038",
      data: {
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
      }
    },
    {
      title: "Brasília",
      id: "3469058",
      data: {
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
      }
    },
    {
      title: "Castanhal",
      id: "3402591",
      data: {
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
      }
    },
    {
      title: "San Diego",
      id: "5391811",
      data: {
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
      }
    }
  ],
  currentWeather: {
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
  }
};

const cities = (state = citiesData, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_CITY:
      // PAYLOAD: OBJECT
      newState.list.push(action.payload);
      return newState;

    case DELETE_CITY:
      //PAYLOD: INDEX
      newState.list = [
        ...newState.slice(0, action.payload),
        ...newState.slice(action.payload + 1)
      ];
      return newState;
    case CHANGE_PAGE:
      //PAYLOAD: PAGE INDEX
      return {
        ...state,
        page: action.payload,
        currentWeather: state.list[action.payload].data
      };
    case WEATHER_FETCH:
    case WEATHER_ERROR:
    case WEATHER_SUCCESS:
      newState.list[newState.page].data = weather(
        newState.list[newState.page].data,
        action
      );
      newState.currentWeather = newState.list[newState.page].data;
      return newState;
    default:
      return state;
  }
};

export default cities;
