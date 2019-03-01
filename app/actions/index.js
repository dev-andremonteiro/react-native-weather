import { secret_token } from "../../secrets";
export const WEATHER_FETCH = "WEATHER_FETCH";
export const WEATHER_SUCCESS = "WEATHER_SUCCESS";
export const WEATHER_ERROR = "WEATHER_ERROR";

export function weatherFetch() {
  return {
    type: WEATHER_FETCH
  };
}
export function weatherSuccess(payload) {
  return {
    type: WEATHER_SUCCESS,
    payload
  };
}

export function weatherError(payload) {
  return {
    type: WEATHER_SUCCESS,
    payload
  };
}

function transformDate(date) {
  if (!date) return null;
  var aestTime = new Date(date * 1000).toLocaleString("en-US", {
    timeZone: "America/Cuiaba"
  });
  aestTime = new Date(aestTime);
  return aestTime;
}

export function fetchWeatherData(id) {
  return (dispatch, getState) => {
    let d = transformDate(getState().cities.currentWeather.dt);
    if (d) {
      if ((d - new Date()) / 1000 / 60 / 60 / 24 >= -0.125) return; //Verifica se o tempo é menor do que 3 h para fazer outra chamada a API
    }

    dispatch(weatherFetch());

    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&lang=en&units=metric&APPID=${secret_token}`
    )
      .then(data => data.json())
      .then(data => {
        if (data.cod === 200 || data.cod === "200") {
          dispatch(weatherSuccess(data));
          return fetch(
            `http://api.openweathermap.org/data/2.5/forecast?id=${id}&lang=en&units=metric&APPID=${secret_token}`
          );
        } else throw new Error("Invalid Weather Fetch! " + data.message);
      })
      .then(forecastData => forecastData.json())
      .then(forecastData => {
        if (forecastData.cod === 200 || forecastData.cod === "200") {
          dispatch(weatherSuccess(forecastData));
        } else
          throw new Error("Invalid Forecast Fetch! " + forecastData.message);
      })
      .catch(err => dispatch(weatherError(err)));
  };
}
//-------------------------------------------------------------

export const ADD_CITY = "ADD_CITY";
export const DELETE_CITY = "DELETE_CITY";
export const CHANGE_PAGE = "CHANGE_PAGE";

export function addCity(payload) {
  return {
    type: ADD_CITY,
    payload
  };
}

export function deleteCity(payload) {
  return {
    type: DELETE_CITY,
    payload
  };
}

export function pageChange(payload) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_PAGE,
      payload
    });

    if (!getState().cities.currentWeather.isFetching) {
      let currentList = getState().cities.list;
      let currentPage = getState().cities.page;
      dispatch(fetchWeatherData(currentList[currentPage].id));
    }

    return;
  };
}
