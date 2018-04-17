import { SELECT_FILE } from '../file-manager/types';
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

const initialSubState = {
  columnCountValidated: false,
  amountColumnValidated: false,
  dateColumnValidated: false,
  errorMessage: null,
  validating: false,
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
    case VALIDATE_AMOUNT_COLUMNS:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          errorMessage: '',
          validating: true,
        },
      };
    case VALIDATE_AMOUNT_COLUMNS_FAILURE:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          errorMessage: action.errorMessage,
          validating: false,
        },
      };
    case VALIDATE_AMOUNT_COLUMNS_SUCCESS:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          amountColumnValidated: true,
          validating: false,
        },
      };
    case VALIDATE_DATE_COLUMNS:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          errorMessage: '',
          validating: true,
        },
      };
    case VALIDATE_DATE_COLUMNS_FAILURE:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          errorMessage: action.errorMessage,
          validating: false,
        },
      };
    case VALIDATE_DATE_COLUMNS_SUCCESS:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          dateColumnValidated: true,
          validating: false,
        },
      };
    case VALIDATE_COLUMN_COUNT:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          validating: true,
        },
      };
    case VALIDATE_COLUMN_COUNT_FAILURE:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          errorMessage: action.errorMessage,
          validating: false,
        },
      };
    case VALIDATE_COLUMN_COUNT_SUCCESS:
      return {
        ...state,
        [action.filename]: {
          ...state[action.filename],
          columnCountValidated: true,
          validating: false,
        },
      };
    default:
      return state;
  }
};

