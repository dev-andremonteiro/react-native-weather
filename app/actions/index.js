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

export function fetchWeatherData(id) {
  return dispatch => {
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
