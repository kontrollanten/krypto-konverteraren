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

const initialSubstate = {
  nrExpectedResults: 0,
  staticToCurrency: null,
  unparsedResults: [],
  parsedResults: [],
  parseErrorRows: [],
  parseIndexes: {
    date: null,
    currency: null,
    amount: null,
  },
  validationErrorMessage: null,
};

export default (state = {}, action) => {
  switch (action.type) {
    case PARSE_RESULTS:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
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
    case SET_STATIC_TO_CURRENCY:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          staticToCurrency: action.symbol,
          parseIndexes: {
            ...state[action.filename].parseIndexes,
            currency: null,
          },
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
    case UPDATE_PARSE_INDEXES:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          parseIndexes: {
            ...state[action.filename].parseIndexes,
            [action.key]: action.index,
          },
        },
      };
  }

  return state;
};
