import {
  UPDATE_EMAIL,
  SUBSCRIBE_SUBMIT,
  SUBSCRIBE_SUBMIT_FAILURE,
  SUBSCRIBE_SUBMIT_SUCCESS,
} from './types';

const initialState = {
  email: '',
  errorMessage: '',
  loading: false,
  success: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_EMAIL:
      return {
        ...state,
        errorMessage: '',
        email: action.email,
        success: null,
      };
    case SUBSCRIBE_SUBMIT:
      return {
        ...state,
        loading: true,
      };

    case SUBSCRIBE_SUBMIT_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: action.message,
      };
    case SUBSCRIBE_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    default:
      return state;
  }
};
