import {
  GUESS_CURRENCY_NAMES,
  GUESS_CURRENCY_NAMES_FAILURE,
  GUESS_CURRENCY_NAMES_SUCCESS,
  TRANSFORM_CURRENCY_NAME,
  TRANSFORM_CURRENCY_NAME_FAILURE,
  TRANSFORM_CURRENCY_NAME_SUCCESS,
} from './types';
import GuessCurrencyNamesWorker from './guess-currency-names.worker';
import TransformCurrencyNameWorker from './transform-currency-name.worker';

export const guessCurrencyNames = ({ filename, rows, index }) => {
  return (dispatch, getState) => {
    dispatch({
      type: GUESS_CURRENCY_NAMES,
      filename,
    });

    const { currencies } = getState().CurrencySelector;
    const worker = new GuessCurrencyNamesWorker();

    worker.addEventListener('message', ({ data }) => {
      dispatch({
        type: GUESS_CURRENCY_NAMES_SUCCESS,
        matches: data.matches,
      });

      worker.terminate();
    });

    worker.postMessage({ currencies, index, rows });
  };
};

export const transformCurrencyName = ({
  filename,
  index,
  oldValue,
  newValue,
}) => {
  return (dispatch, getState) => {
    dispatch({
      type: TRANSFORM_CURRENCY_NAME,
      filename,
      oldValue,
    });
    const rows = getState().FileManager[filename].unparsedResults;
    const worker = new TransformCurrencyNameWorker();

    worker.addEventListener('message', ({ data }) => {
      const { rows } = data;

      dispatch({
        type: TRANSFORM_CURRENCY_NAME_SUCCESS,
        filename,
        rows,
      });

      worker.terminate();
    });

    worker.postMessage({
      index,
      newValue,
      oldValue,
      rows,
    });
  };
};
