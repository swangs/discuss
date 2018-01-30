import * as SessionApiUtil from '../util/session_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const signUp = (formUser) => dispatch => {
  return SessionApiUtil.signUp(formUser).then(
    user => dispatch(receiveCurrentUser(user)),
    error => dispatch(receiveErrors(error))
  );
};

export const signIn = (formUser) => dispatch => {
  return SessionApiUtil.signUp(formUser).then(
    user => dispatch(receiveCurrentUser(user)),
    error => dispatch(receiveErrors(error))
  );
};

export const signOut = () => dispatch => {
  return SessionApiUtil.signOut().then(
    user => dispatch(receiveCurrentUser(null)),
    error => dispatch(receiveErrors(error))
  );
};
