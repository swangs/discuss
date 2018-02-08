import {
  RECEIVE_CURRENT_USER,
  LOGOUT_USER
 } from '../actions/session_actions';
import merge from 'lodash/merge';

const _nullUser = {
  currentUser: null
};

const sessionReducer = (oldState = _nullUser, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { currentUser: action.currentUser.currentUser };
    case LOGOUT_USER:
      return _nullUser;
    default:
      return oldState;
  }
};

export default sessionReducer;
