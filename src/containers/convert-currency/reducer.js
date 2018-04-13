import {
  FETCH_RESULTS,
  FETCH_RESULTS_FAILURE,
  FETCH_RESULTS_SUCCESS,
  UPDATE_REQUEST_URL,
} from './types';

const initialState = {
  currencies: [
    { FullName: 'Svenska kronor (SEK)', Symbol: 'SEK' },
    { FullName: 'US Dollar (USD)', Symbol: 'USD' },
    { FullName: 'EUR (EUR)', Symbol: 'EUR' },
  ],
  results: [],
  requestUrl: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_REQUEST_URL:
      return {
        ...state,
        requestUrl: action.requestUrl,
      };
    case FETCH_RESULTS_SUCCESS:
      return {
        ...state,
        results: [
          ...state.results,
          ...action.results,
        ],
      };
  }

  return state;
};
