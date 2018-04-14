import {
  SELECT_FILE,
  SELECT_FILE_SUCCESS,
} from '../file-manager/types';
import {
  EMPTY_ROWS_ANALYZE,
  EMPTY_ROWS_ANALYZE_FAILURE,
  EMPTY_ROWS_ANALYZE_SUCCESS,
} from './types';

const initialSubState = {
  emptyRowSuspects: [],
  errorMessage: null,
  loading: false,
  suspectedHeader: null,
};

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_FILE:
      return {
        ...state,
        [action.filename]: {
          ...initialSubState,
        },
      };
    case SELECT_FILE_SUCCESS:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          suspectedHeader: action.results.slice(0, 1),
        },
      };
    case EMPTY_ROWS_ANALYZE:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          loading: true,
        },
      };
    case EMPTY_ROWS_ANALYZE_FAILURE:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          errorMessage: action.errorMessage,
          loading: false,
        },
      };
    case EMPTY_ROWS_ANALYZE_SUCCESS:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          emptyRowSuspects: action.suspects,
          loading: false,
        },
      };
    default:
      return state;
  }
};

