import {
  RECEIVE_SERVER,
  REMOVE_SERVER
} from '../actions/server_actions';
import { LOGOUT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';


const userReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  let newState;
  switch (action.type) {
    case RECEIVE_SERVER:
      return action.currentServer.users;
    case REMOVE_SERVER:
      return [];
    case LOGOUT_USER:
      return [];
    default:
      return oldState;
  }
};

export default userReducer;
