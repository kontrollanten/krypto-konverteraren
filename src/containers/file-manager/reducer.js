import {
  PARSE_RESULTS_SUCCESS,
  SELECT_FILE,
  SELECT_FILE_FAILURE,
  SELECT_FILE_SUCCESS,
  UPDATE_PARSE_INDEXES,
} from './types';

const initialState = {
  unparsedResults: [],
  parsedResults: [],
  parseIndexes: {
    date: null,
    currency: null,
    amount: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PARSE_RESULTS_SUCCESS:
      return {
        ...initialState,
        parsedResults: action.parsedResults,
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
