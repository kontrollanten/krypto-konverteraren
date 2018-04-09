import Papa from 'papaparse';
import moment from 'moment';
import {
  PARSE_RESULTS,
  PARSE_RESULTS_FAILURE,
  PARSE_RESULTS_SUCCESS,
  SET_STATIC_TO_CURRENCY,
  SELECT_FILE,
  SELECT_FILE_FAILURE,
  SELECT_FILE_SUCCESS,
  UPDATE_PARSE_INDEXES,
} from './types';

export const fetchHistoricalValueForCurrency = ({ fromCurrency, toCurrency, date }) => {
  const timestamp = moment(date).unix();

  return fetch(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${fromCurrency}&tsyms=${toCurrency}&ts=${timestamp}&extraParams=krypto-konverteraren`)
    .then(response => response.json());
};

export const downloadParsedResults = () => {
  return (dispatch, getState) => {
    const { parsedResults } = getState().FileManager;

    const fileContent = 'data:text/csv;charset=utf-8,'
      .concat(
        parsedResults
          .map(row => row.join(','))
          .join('\r\n')
      );

    const encodedFile = encodeURI(fileContent);

    const link = document.createElement('a');
    link.setAttribute('href', encodedFile);
    link.setAttribute('download', 'converted-file.csv');

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };
};

export const parseResults = () => {
  return (dispatch, getState) => {
    const state = getState().FileManager;
    const {
      parseIndexes,
      staticToCurrency,
      unparsedResults,
    } = state;
    const toCurrency = 'SEK';
    const parsedResults = [];

    dispatch({
      type: PARSE_RESULTS,
      nrExpectedResults: unparsedResults.length,
    });

    unparsedResults
      .map(row => ({
        fromCurrency: row[parseIndexes.currency],
        amount: row[parseIndexes.amount],
        date: row[parseIndexes.date],
      }))
      .forEach((row, index) => {
        if (isNaN(parseFloat(row.amount))) {
          if (index === 0) {
            parsedResults[index] = [...unparsedResults[index], toCurrency];
          } else {
            parsedResults[index] = [...unparsedResults[index], null];
          }
          return;
        }

        fetchHistoricalValueForCurrency({
          fromCurrency: staticToCurrency || row.fromCurrency,
          date: row.date,
          toCurrency,
        })
          .then(results => {
            const currencyValue = Object.values(Object.values(results).pop()).pop();
            parsedResults[index] = [...unparsedResults[index], currencyValue * row.amount];

            dispatch({
              type: PARSE_RESULTS_SUCCESS,
              parsedResults,
            });
          })
          .catch(error => {
            parsedResults[index] = null;
            dispatch({
              type: PARSE_RESULTS_FAILURE,
              row: index + 1,
            });
          });
      });
  };
};

export const selectFile = file => {
  return dispatch => {
    dispatch({
      type: SELECT_FILE,
    });

    Papa.parse(file, {
      complete: results => {
        dispatch({
          type: SELECT_FILE_SUCCESS,
          results: results.data,
        });
      },
    });
  };
};

export const setStaticToCurrency = ({ symbol }) => {
  return {
    type: SET_STATIC_TO_CURRENCY,
    symbol,
  };
};

export const updateParseIndex = ({ key, index }) => {
  return {
    type: UPDATE_PARSE_INDEXES,
    key,
    index,
  };
};

