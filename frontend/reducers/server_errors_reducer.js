import {
  RECEIVE_ALL_SERVERS,
  RECEIVE_SERVER,
  RECEIVE_SERVER_ERRORS
} from '../actions/server_actions';
import merge from 'lodash/merge';

const serverErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_SERVERS:
      return [];
    case RECEIVE_SERVER:
      return [];
    case RECEIVE_SERVER_ERRORS:
      return action.errors;
    default:
      return oldState;
  }
};

export default serverErrorsReducer;
