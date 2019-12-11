export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const REQUEST_CURRENT = 'REQUEST_CURRENT';
export const RECEIVE_CURRENT = 'RECEIVE_CURRENT';
export const REQUEST_FORECAST = 'REQUEST_FORECAST';
export const RECEIVE_FORECAST = 'RECEIVE_FORECAST';

const API_KEY = 'a9d5c496d44e658bbaa30c1c5476cfc6';

export const receiveError = payload => ({
  type: RECEIVE_ERROR,
  payload
});

export const requestLocation = () => dispatch => {
  const geolocation = navigator.geolocation;
  geolocation.getCurrentPosition(
    response =>
      dispatch(
        receiveLocation({
          latitude: response.coords.latitude,
          longitude: response.coords.longitude
        })
      ),
    error => dispatch(receiveError(error.message))
  );
};

export const receiveLocation = payload => ({
  type: RECEIVE_LOCATION,
  payload
});

export const requestCurrent = geolocation => dispatch =>
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${geolocation.latitude}&lon=${geolocation.longitude}&units=imperial&appid=${API_KEY}`
  ).then(
    response => {
      response.json().then(data => {
        dispatch(receiveCurrent(data));

        if (data.cod !== 200) {
          dispatch(receiveError(data.message));
        }
      });
    },
    error => dispatch(receiveError(error))
  );

export const receiveCurrent = payload => ({
  type: RECEIVE_CURRENT,
  payload
});

export const requestForecast = geolocation => dispatch =>
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${geolocation.latitude}&lon=${geolocation.longitude}&units=imperial&appid=${API_KEY}`
  ).then(
    response => {
      response.json().then(data => {
        dispatch(receiveForecast(data));

        if (data.cod !== '200') {
          dispatch(receiveError(data.message));
        }
      });
    },
    error => dispatch(receiveError(error))
  );

export const receiveForecast = payload => ({
  type: RECEIVE_FORECAST,
  payload
});
