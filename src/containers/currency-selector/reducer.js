import {
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_FAILURE,
  FETCH_CURRENCIES_SUCCESS,
} from './types';

const initialState = {
  errorMessage: null,
  currencies: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENCIES:
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case FETCH_CURRENCIES_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
      };
    case FETCH_CURRENCIES_SUCCESS:
      return {
        ...state,
        loading: false,
        currencies: [...action.currencies],
      };
    default:
      return state;
  }
};

