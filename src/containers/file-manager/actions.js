import Papa from 'papaparse';
import moment from 'moment';
import throat from 'throat';
import { validateAmountColumns, validateColumnCount, validateDateColumns } from '../file-validator/actions';
import {
  PARSE_RESULTS,
  PARSE_RESULTS_FAILURE,
  PARSE_RESULTS_SUCCESS,
  SET_STATIC_TO_CURRENCY,
  SELECT_FILE,
  SELECT_FILE_FAILURE,
  SELECT_FILE_SUCCESS,
  UPDATE_AMOUNT_INDEXES,
  UPDATE_CURRENCY_INDEX,
  UPDATE_DATE_INDEX,
} from './types';

const valueConvertCache = {};

export const fetchHistoricalValueForCurrency = ({ fromCurrency, toCurrency, date }) => {
  const cacheKey = fromCurrency.concat(toCurrency, date);
  const cache = valueConvertCache[cacheKey];

  if (cache) {
    return cache;
  }

  const toTs = moment(date).unix();
  // CryptoCompare responds with the last two hours prices so we add one hour to our req
  const fromTs = moment(date).subtract(1, 'hour').unix();

  const value = fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=${fromCurrency}&tsym=${toCurrency}&toTs=${fromTs}&extraParams=krypto-konverteraren&limit=1`)
    .then(response => response.json())
    .then(jsonResponse => {
      const value = jsonResponse.Data
        .map(data => {
          return {
            ...data,
            middlePrice: (data.open + data.close) / 2,
          };
        })
        .reduce((prev, curr) => {
          return (Math.abs(curr.time - toTs) < Math.abs(prev.time - toTs) ? curr : prev);
        }, { time: 0 });

      return value;
    });

  valueConvertCache[cacheKey] = value;

  return value;
};

export const downloadParsedResults = filename => {
  return (dispatch, getState) => {
    const { headerRow, parsedResults } = getState().FileManager[filename];

    const fileContent = 'data:text/csv;charset=utf-8,'
      .concat(
        [headerRow, ...parsedResults]
          .map(row => row.join(','))
          .join('\r\n')
      );

    const encodedFile = encodeURI(fileContent);

    const link = document.createElement('a');
    link.setAttribute('href', encodedFile);
    link.setAttribute('download', `${filename}-SEK.csv`);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };
};

export const parseResults = (filename) => {
  return (dispatch, getState) => {
    const { 
      amountIndexes,
      currencyIndex,
      dateIndex,
      headerRow,
      staticToCurrency,
      unparsedResults,
    } = getState().FileManager[filename];
    const toCurrency = 'SEK';
    const parsedResults = [...unparsedResults];
    const colNumbers = parsedResults[0].length;
    let nrParsedResults = 0;

    const convertMapping = amountIndexes
      .map((fromIndex, i) => ({ fromIndex, toIndex: i + colNumbers }));

    dispatch({
      type: PARSE_RESULTS,
      headerRow: [...headerRow, ...convertMapping.map(({ fromIndex }) => headerRow[fromIndex].concat(` (${toCurrency})`))],
      nrExpectedResults: unparsedResults.length,
      filename,
    });

    const throttle = throat(10);

    unparsedResults
      .map(row => ({
        fromCurrency: row[currencyIndex],
        date: row[dateIndex],
        origRow: row,
      }))
        .forEach((row, index) => {
          throttle(fetchHistoricalValueForCurrency.bind(null, {
            fromCurrency: staticToCurrency || row.fromCurrency,
            date: row.date,
            toCurrency,
          }))
            .then(({ middlePrice }) => {
              if (isNaN(middlePrice)) {
                throw Error();
              }

              convertMapping
                .forEach(({ fromIndex, toIndex }) => {
                  parsedResults[index][toIndex] = middlePrice * row.origRow[fromIndex];
                });

              nrParsedResults += 1;

              dispatch({
                type: PARSE_RESULTS_SUCCESS,
                filename,
                parsedResults: [...parsedResults],
                nrParsedResults,
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

    return new Promise(resolve => {
      Papa.parse(file, {
        complete: results => {
          const rows = results.data;

          dispatch({
            type: SELECT_FILE_SUCCESS,
            filename: file.name,
            results: rows,
          });
   
          dispatch(validateColumnCount(file.name, rows));

          resolve();
        },
      });
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
    switch (key) {
      case 'amount':
        dispatch({
          type: UPDATE_AMOUNT_INDEXES,
          filename,
          index,
        });
        break;
      case 'currency':
        dispatch({
          type: UPDATE_CURRENCY_INDEX,
          filename,
          index,
        });
        break;
      case 'date':
        dispatch({
          type: UPDATE_DATE_INDEX,
          filename,
          index,
        });
        break;
    };

    if (!index) {
      return;
    }

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

