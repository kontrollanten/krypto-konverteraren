import ValidateColumnWorker from './validate-column-count.worker.js';
import {
  VALIDATE_COLUMN_COUNT,
  VALIDATE_COLUMN_COUNT_FAILURE,
  VALIDATE_COLUMN_COUNT_SUCCESS,
} from './types';

export const validateColumnCount = (filename, rows) => {
  return dispatch => {
    dispatch({
      type: VALIDATE_COLUMN_COUNT,
      filename,
    });

    const instance = new ValidateColumnWorker();
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
