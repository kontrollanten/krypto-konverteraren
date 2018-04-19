import FetchCurrenciesWorker from './fetch-currencies.worker';
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

    const worker = new FetchCurrenciesWorker();
    worker.postMessage({});

    worker.addEventListener('message', event => {
      const { currencies, error } = event.data;

      if (error) {
        return dispatch({
          type: FETCH_CURRENCIES_FAILURE,
        });
      }

      dispatch({
        type: FETCH_CURRENCIES_SUCCESS,
        currencies,
      });

      worker.terminate();
    });
  };
}

