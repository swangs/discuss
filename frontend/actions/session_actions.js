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

export const register = (formUser) => dispatch => {
  return SessionApiUtil.register(formUser).then(
    user => dispatch(receiveCurrentUser(user)),
    error => dispatch(receiveErrors(error.responseJSON))
  );
};

export const login = (formUser) => dispatch => {
  return SessionApiUtil.login(formUser).then(
    user => dispatch(receiveCurrentUser(user)),
    error => dispatch(receiveErrors(error.responseJSON))
  );
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(
    user => dispatch(receiveCurrentUser(null)),
    error => dispatch(receiveErrors(error.responseJSON))
  );
};
