import fetchJsonp from 'fetch-jsonp';
import {
  UPDATE_EMAIL,
  SUBSCRIBE_SUBMIT,
  SUBSCRIBE_SUBMIT_FAILURE,
  SUBSCRIBE_SUBMIT_SUCCESS,
} from './types';

export const updateEmail = email => ({
  type: UPDATE_EMAIL,
  email,
});

export const submit = () => {
  return (dispatch, getState) => {
    const state = getState().SubscribeToNewsletter;

    dispatch({
      type: SUBSCRIBE_SUBMIT,
    });

    window.c = (response) => {
      console.log(response);
    };

    fetchJsonp(`https://k4krypto.us18.list-manage.com/subscribe/post-jsonp?u=da42a6e217341b71794dd101d&id=02dd9d045b&EMAIL=${state.email}&STATUS=subscribed`, {
      method: 'GET',
      mode: 'no-cors',
      headers: ({
        'Content-Type': 'application/json',
      })
    })
      .then(response => {
        console.log(response);
        return response;
      })
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: SUBSCRIBE_SUBMIT_SUCCESS,
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: SUBSCRIBE_SUBMIT_FAILURE,
        });
      });
  };
};

