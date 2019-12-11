import { combineReducers } from 'redux';
import {
  RECEIVE_ERROR,
  RECEIVE_LOCATION,
  RECEIVE_CURRENT,
  RECEIVE_FORECAST
} from '../actions';

const initialState = {
  error: undefined,
  geolocation: undefined,
  current: undefined,
  forecast: undefined
};

const weather = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case RECEIVE_LOCATION:
      return {
        ...state,
        geolocation: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        }
      };

    case RECEIVE_CURRENT:
      return {
        ...state,
        current: action.payload
      };

    case RECEIVE_FORECAST:
      return {
        ...state,
        forecast: action.payload
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  weather
});

export default rootReducer;
