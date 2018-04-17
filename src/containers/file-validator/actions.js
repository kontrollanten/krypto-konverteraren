import ValidateColumnsWorker from './validate-column-count.worker.js';
import ValidateAmountColumnsWorker from './validate-amount-columns.worker.js';
import ValidateDateColumnsWorker from './validate-date-columns.worker.js';
import {
  VALIDATE_AMOUNT_COLUMNS,
  VALIDATE_AMOUNT_COLUMNS_FAILURE,
  VALIDATE_AMOUNT_COLUMNS_SUCCESS,
  VALIDATE_DATE_COLUMNS,
  VALIDATE_DATE_COLUMNS_FAILURE,
  VALIDATE_DATE_COLUMNS_SUCCESS,
  VALIDATE_COLUMN_COUNT,
  VALIDATE_COLUMN_COUNT_FAILURE,
  VALIDATE_COLUMN_COUNT_SUCCESS,
} from './types';

export const validateAmountColumns = ({ filename, rows, amountIndex }) => {
  return dispatch => {
    dispatch({
      type: VALIDATE_AMOUNT_COLUMNS,
      filename,
    });

    const worker = new ValidateAmountColumnsWorker();
    worker.postMessage({ rows, amountIndex });

    worker.addEventListener('message', event => {
      const errorMessage = event.data;

      if (errorMessage) {
        return dispatch({
          type: VALIDATE_AMOUNT_COLUMNS_FAILURE,
          errorMessage,
          filename,
        });
      }

      dispatch({
        type: VALIDATE_AMOUNT_COLUMNS_SUCCESS,
        filename,
      });
    });
  };
};

export const validateColumnCount = (filename, rows) => {
  return dispatch => {
    dispatch({
      type: VALIDATE_COLUMN_COUNT,
      filename,
    });

    const instance = new ValidateColumnsWorker();
    instance.postMessage(rows);

    instance.addEventListener('message', event => {
      const errorMessage = event.data;

      if (errorMessage) {
        dispatch({
          type: VALIDATE_COLUMN_COUNT_FAILURE,
          filename,
          errorMessage,
        });
      }

      dispatch({
        type: VALIDATE_COLUMN_COUNT_SUCCESS,
        filename,
      });
    });
  };
}

export const validateDateColumns = ({ filename, rows, dateIndex }) => {
  return dispatch => {
    dispatch({
      type: VALIDATE_DATE_COLUMNS,
      filename,
    });

    const worker = new ValidateDateColumnsWorker();
    worker.postMessage({ rows, dateIndex });
    worker.addEventListener('message', event => {
      const errorMessage = event.data;

      if (errorMessage) {
        return dispatch({
          type: VALIDATE_DATE_COLUMNS_FAILURE,
          filename,
          errorMessage,
        });
      }

      dispatch({
        type: VALIDATE_DATE_COLUMNS_SUCCESS,
        filename,
      });
    });
  };
};

