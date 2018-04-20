import { validateAmountColumns, validateColumnCount, validateCurrencyColumns, validateDateColumns } from '../file-validator/actions';
import ConvertCurrenciesWorker from './convert-currencies.worker';
import ParseCsvWorker from './parse-csv.worker';
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
      headerRow,
      unparsedResults,
    } = getState().FileManager[filename];

    const toCurrency = 'SEK';
    const colNumbers = unparsedResults[0].length;
    const convertMapping = amountIndexes
      .filter(i => i !== null)
      .map((fromIndex, i) => ({ fromIndex, toIndex: i + colNumbers }));

    dispatch({
      type: PARSE_RESULTS,
      headerRow: [...headerRow, ...convertMapping.map(({ fromIndex }) => headerRow[fromIndex].concat(` (${toCurrency})`))],
      nrExpectedResults: unparsedResults.length,
      filename,
    });

    const parsedResults = [...unparsedResults];
    let nrParsedResults = 0;

    const worker = new ConvertCurrenciesWorker();
    worker.addEventListener('message', ({ data }) => {
      const {
        errorMessage,
        index,
        middlePrice,
        row,
      } = data;

      if (errorMessage) {
        parsedResults[index] = null;
        return dispatch({
          type: PARSE_RESULTS_FAILURE,
          filename,
          row: index + 1,
        });
      }

      nrParsedResults += 1;

      convertMapping
        .forEach(({ fromIndex, toIndex }) => {
          parsedResults[index][toIndex] = middlePrice * row[fromIndex];
        });

      dispatch({
        type: PARSE_RESULTS_SUCCESS,
        filename,
        parsedResults: [...parsedResults],
        nrParsedResults,
      });
    });

    const { 
      currencyIndex,
      dateIndex,
      staticToCurrency,
      unparsedResults: rows,
    } = getState().FileManager[filename];

    worker.postMessage({
      currencyIndex,
      dateIndex,
      rows,
      staticToCurrency,
      toCurrency,
    });
  };
};

export const selectFile = file => {
  return dispatch => {
    dispatch({
      type: SELECT_FILE,
      filename: file.name,
    });

    const worker = new ParseCsvWorker();
    worker.addEventListener('message', ({ data }) => {
      const { rows } = data;

      dispatch({
        type: SELECT_FILE_SUCCESS,
        filename: file.name,
        results: rows,
      });

      dispatch(validateColumnCount(file.name, rows));
    });

    worker.postMessage({ file });
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

    if (index === null) {
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
      case 'currency':
        dispatch(validateCurrencyColumns({ filename, rows: rows.slice(1), currencyIndex: index }));
        break;
    };
  };
  return ;
};

