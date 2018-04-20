import {
  GUESS_CURRENCY_NAMES,
  GUESS_CURRENCY_NAMES_FAILURE,
  GUESS_CURRENCY_NAMES_SUCCESS,
  TRANSFORM_CURRENCY_NAME,
  TRANSFORM_CURRENCY_NAME_FAILURE,
  TRANSFORM_CURRENCY_NAME_SUCCESS,
} from './types';

const initialState = {
  currentlyTransforming: '',
  errorMessage: '',
  searching: false,
  transformed: [],
  matches: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GUESS_CURRENCY_NAMES:
      return {
        ...initialState,
        searching: true,
      };
    case GUESS_CURRENCY_NAMES_FAILURE:
      return {
        ...state,
        searching: false,
        errorMessage: action.errorMessage,
      };
    case GUESS_CURRENCY_NAMES_SUCCESS:
      return {
        ...state,
        searching: false,
        matches: action.matches,
      };
    case TRANSFORM_CURRENCY_NAME:
      return {
        ...state,
        currentlyTransforming: action.oldValue,
      };
    case TRANSFORM_CURRENCY_NAME_SUCCESS:
      return {
        ...state,
        currentlyTransforming: '',
        transformed: [...state.transformed, state.currentlyTransforming],
      };
    default:
      return state;
  }
};
