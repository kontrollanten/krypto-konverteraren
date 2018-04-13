import Papa from 'papaparse';
import moment from 'moment';
import { validateAmountColumns, validateColumnCount, validateDateColumns } from '../file-validator/actions';
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

export const parseResults = (filename) => {
  return (dispatch, getState) => {
    const state = getState().FileManager[filename];
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
      filename,
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
            parsedResults[index] = [...unparsedResults[index], middlePrice * row.amount];

            dispatch({
              type: PARSE_RESULTS_SUCCESS,
              filename,
              parsedResults,
            });
          })
          .catch(error => {
            parsedResults[index] = null;
            dispatch({
              type: PARSE_RESULTS_FAILURE,
              filename,
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
      filename: file.name,
    });

    Papa.parse(file, {
      complete: results => {
        const rows = results.data;

        dispatch(validateColumnCount(file.name, rows));

        dispatch({
          type: SELECT_FILE_SUCCESS,
          filename: file.name,
          results: rows,
        });
      },
    });
  };
};

export const setStaticToCurrency = ({ symbol, filename }) => {
  return {
    type: SET_STATIC_TO_CURRENCY,
    symbol,
    filename,
  };
};

export const updateParseIndex = ({ filename, key, index }) => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_PARSE_INDEXES,
      filename,
      key,
      index,
    });

    const rows = getState().FileManager[filename].unparsedResults;

    switch (key) {
      case 'date':
        dispatch(validateDateColumns({filename, rows: rows.slice(1), dateIndex: index}));
        break;
      case 'amount':
        dispatch(validateAmountColumns({ filename, rows: rows.slice(1), amountIndex: index }));
        break;
    };
  };
  return ;
};

