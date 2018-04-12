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
  const toTs = moment(date).unix();
  // CryptoCompare responds with the last two hours prices so we add one hour to our req
  const fromTs = moment(date).subtract(1, 'hour').unix();

  return fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=ETH&tsym=SEK&toTs=1511452563&extraParams=krypto-konverteraren&limit=1`)
    .then(response => response.json())
    .then(jsonResponse => {
      return jsonResponse.Data
        .map(data => {
          return {
            ...data,
            middlePrice: (data.open + data.close) / 2,
          };
        })
        .reduce((prev, curr) => {
          return (Math.abs(curr.time - toTs) < Math.abs(prev.time - toTs) ? curr : prev);
        }, { time: 0 });
    });
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
          .then(({ middlePrice }) => {
            if (isNaN(middlePrice)) {
              throw Error();
            }
            // const currencyValue = Object.values(Object.values(results).pop()).pop();
            parsedResults[index] = [...unparsedResults[index], middlePrice * row.amount];

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

