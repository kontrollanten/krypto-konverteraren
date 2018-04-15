import AnalyzeEmptyRowsWorker from './analyze-empty-rows.worker.js';
import {
  EMPTY_ROWS_ANALYZE,
  EMPTY_ROWS_ANALYZE_FAILURE,
  EMPTY_ROWS_ANALYZE_SUCCESS,
  REMOVE_ROWS,
  REMOVE_ROWS_SUCCESS,
  VERIFY_SUSPECTED_HEADER,
} from './types';

export const analyzeEmptyRows = (filename) => {
  return (dispatch, getState) => {
    const rows = getState().FileManager[filename].unparsedResults;

    dispatch({
      type: EMPTY_ROWS_ANALYZE,
      filename,
    });

    const worker = new AnalyzeEmptyRowsWorker();
    worker.postMessage(rows);

    worker.addEventListener('message', event => {
      const { errorMessage, suspects } = event.data;

      if (errorMessage) {
        return dispatch({
          type: EMPTY_ROWS_ANALYZE_FAILURE,
          errorMessage,
          filename,
        });
      }

      dispatch({
        type: EMPTY_ROWS_ANALYZE_SUCCESS,
        filename,
        suspects,
      });
    });
  };
};

export const removeRows = ({ filename, indexes }) => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_ROWS,
      filename
    });

    const { unparsedResults } = getState().FileManager[filename];

    const cleanedResults = unparsedResults
      .filter((r, index) => indexes.indexOf(index) === -1);

    dispatch({
      type: REMOVE_ROWS_SUCCESS,
      rows: cleanedResults,
      filename,
    });
  };
}

export const verifySuspectedHeader = filename => {
  return {
    type: VERIFY_SUSPECTED_HEADER,
    filename,
  };
};

