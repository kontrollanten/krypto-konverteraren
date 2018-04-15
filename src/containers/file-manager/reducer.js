import { VERIFY_SUSPECTED_HEADER, REMOVE_ROWS_SUCCESS } from '../parse-rows/types';
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

const initialSubstate = {
  amountIndexes: [],
  currencyIndex: null,
  dateIndex: null,
  nrExpectedResults: 0,
  headerRow: [],
  staticToCurrency: null,
  unparsedResults: [],
  parseErrorRows: [],
  parsedResults: [],
  validationErrorMessage: null,
};

export default (state = {}, action) => {
  switch (action.type) {
    case PARSE_RESULTS:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          headerRow: [...action.headerRow],
          nrExpectedResults: action.nrExpectedResults,
        },
      };
    case PARSE_RESULTS_FAILURE:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          parseErrorRows: [...state[action.filename].parseErrorRows, action.row],
        },
      };
    case PARSE_RESULTS_SUCCESS:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          parsedResults: [...action.parsedResults],
        },
      };
    case REMOVE_ROWS_SUCCESS:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          unparsedResults: [...action.rows],
        },
      };
    case SET_STATIC_TO_CURRENCY:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          staticToCurrency: action.symbol,
          currencyIndex: null,
        },
      };
    case SELECT_FILE:
      return {
        ...state,
        [action.filename]: {
          ...initialSubstate,
        },
      };
    case SELECT_FILE_FAILURE: 
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          validationErrorMessage: action.errorMessage,
        },
      };
    case SELECT_FILE_SUCCESS:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          unparsedResults: action.results,
        },
      };
    case UPDATE_AMOUNT_INDEXES:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          amountIndexes: [...state[action.filename].amountIndexes, action.index],
        },
      };
    case UPDATE_CURRENCY_INDEX:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          currencyIndex: action.index,
        },
      };
    case UPDATE_DATE_INDEX:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          dateIndex: action.index,
        },
      };
    case VERIFY_SUSPECTED_HEADER:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          headerRow: state[action.filename].unparsedResults.slice(0, 1).pop(),
          unparsedResults: state[action.filename].unparsedResults.slice(1),
        },
      };
  }

  return state;
};
