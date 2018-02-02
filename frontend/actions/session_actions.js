import * as SessionApiUtil from '../util/session_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const LOGOUT_USER = "LOGOUT_USER";

const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser
  };
};

const receiveSessionErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

const logoutUser = (currentUser) => {
  return {
      type: LOGOUT_USER,
      currentUser
  };
};

export const clearErrors = () => dispatch => {
  return dispatch(receiveSessionErrors([]));
};

export const register = (formUser) => dispatch => {
  return SessionApiUtil.register(formUser).then(
    user => dispatch(receiveCurrentUser(user)),
    error => dispatch(receiveSessionErrors(error.responseJSON))
  );
};

export const login = (formUser) => dispatch => {
  return SessionApiUtil.login(formUser).then(
    user => dispatch(receiveCurrentUser(user)),
    error => dispatch(receiveSessionErrors(error.responseJSON))
  );
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(
    user => dispatch(logoutUser(null)),
    error => dispatch(receiveSessionErrors(error.responseJSON))
  );
};
