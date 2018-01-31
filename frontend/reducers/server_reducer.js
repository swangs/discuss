import {
  RECEIVE_ALL_SERVERS,
  RECEIVE_SERVER
} from '../actions/server_actions';
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
      newState = merge({}, oldState, action.servers);
      return newState;
    case RECEIVE_SERVER:
      newState = merge({}, oldState, action.currentServer);
      return newState;
    default:
      return oldState;
  }
};

export default serverReducer;
