import {
  RECEIVE_SERVER,
  REMOVE_SERVER
} from '../actions/server_actions';
import { RECEIVE_CURRENT_USER, LOGOUT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

const _nullUsers = {
  allUsers: null,
  users: null,
};


const userReducer = (oldState = _nullUsers, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      newState.allUsers = action.currentUser.allUsers;
      return newState;
    case RECEIVE_SERVER:
      newState.users = action.currentServer.users;
      return newState;
    case REMOVE_SERVER:
      newState.users = null;
      return newState;
    case LOGOUT_USER:
      newState.users = null;
      return newState;
    default:
      return oldState;
  }
};

export default userReducer;
