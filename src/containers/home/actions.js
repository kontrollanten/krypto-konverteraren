import moment from 'moment';
import 'moment-timezone';
import {
  FETCH_CURRENCIES,
  FETCH_CURRENCIES_FAILURE,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_RESULTS,
  FETCH_RESULTS_FAILURE,
  FETCH_RESULTS_SUCCESS,
  UPDATE_REQUEST_URL,
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

export const fetchResults = ({
  date,
  fromCurrency,
  toCurrency,
}) => {
  return dispatch => {
    dispatch({
      type: FETCH_RESULTS,
    });

    const unixDate = moment.tz(date, 'UTC').unix();
    const requestUrl = `https://min-api.cryptocompare.com/data/histoday?fsym=${fromCurrency}&tsym=${toCurrency}&limit=0&toTs=${unixDate}&aggregate=1`;

    dispatch({
      type: UPDATE_REQUEST_URL,
      requestUrl,
    });

    fetch(requestUrl)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: FETCH_RESULTS_SUCCESS,
          results: [
            ...jsonResponse.Data
              .map(line => ({
                ...line,
                date: moment.tz(line.time * 1000, moment.tz.guess()).format('YYYY-MM-DD'),
                fromCurrency,
                toCurrency,
              })),
          ],
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_RESULTS_FAILURE,
        });
      });
  };
};

