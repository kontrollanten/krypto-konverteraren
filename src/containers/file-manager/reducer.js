import {
  PARSE_RESULTS_FAILURE,
  PARSE_RESULTS_SUCCESS,
  SET_STATIC_TO_CURRENCY,
  SELECT_FILE,
  SELECT_FILE_FAILURE,
  SELECT_FILE_SUCCESS,
  UPDATE_PARSE_INDEXES,
} from './types';

const initialState = {
  staticToCurrency: null,
  unparsedResults: [],
  parsedResults: [],
  parseErrorRows: [],
  parseIndexes: {
    date: null,
    currency: null,
    amount: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PARSE_RESULTS_FAILURE:
      return {
        ...state,
        parseErrorRows: [...state.parseErrorRows, action.row],
      };
    case PARSE_RESULTS_SUCCESS:
      return {
        ...initialState,
        parsedResults: action.parsedResults,
      };
    case SET_STATIC_TO_CURRENCY:
      return {
        ...state,
        staticToCurrency: action.symbol,
        parseIndexes: {
          ...state.parseIndexes,
          currency: null,
        },
      };
    case SELECT_FILE_SUCCESS:
      return {
        ...state,
        unparsedResults: action.results,
      };
    case UPDATE_PARSE_INDEXES:
      return {
        ...state,
        parseIndexes: {
          ...state.parseIndexes,
          [action.key]: action.index,
        },
      };
  }

  return state;
};
