import {
  RECEIVE_ALL_SERVERS,
  RECEIVE_SERVER,
  REMOVE_SERVER
} from '../actions/server_actions';
import { LOGOUT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

const _nullServer = {
  currentServer: null,
  servers: null
};

const serverReducer = (oldState = _nullServer, action) => {
  Object.freeze(oldState);
  let newState;
  switch (action.type) {
    case RECEIVE_ALL_SERVERS:
      const servers = action.servers;
      newState = merge({}, oldState, { servers });
      return newState;
    case RECEIVE_SERVER:
      const currentServer = action.currentServer;
      newState = merge({}, oldState);
      newState.currentServer = currentServer;
      return newState;
    case REMOVE_SERVER:
      newState = merge({}, oldState);
      delete newState.servers[parseInt(action.serverId)];
      return newState;
    case LOGOUT_USER:
      return _nullServer;
    default:
      return oldState;
  }
};

export default serverReducer;
