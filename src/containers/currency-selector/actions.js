import {
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_FAILURE,
  FETCH_CURRENCIES_SUCCESS,
} from './types';

export const fetchCurrencies = () => {
  return dispatch => {
    dispatch({
      type: FETCH_CURRENCIES,
    });

    fetch('https://min-api.cryptocompare.com/data/all/coinlist')
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: FETCH_CURRENCIES_SUCCESS,
          currencies: Object.values(jsonResponse.Data),
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_CURRENCIES_FAILURE,
        });
      });
  };
}

