import SortCurrenciesWorker from './sort-currencies.worker';
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
        const worker = new SortCurrenciesWorker();
        worker.postMessage({ currencies: Object.values(jsonResponse.Data) });

        worker.addEventListener('message', event => {
          const { currencies } = event.data;

          dispatch({
            type: FETCH_CURRENCIES_SUCCESS,
            currencies,
          });

          worker.terminate();
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_CURRENCIES_FAILURE,
        });
      });
  };
}

