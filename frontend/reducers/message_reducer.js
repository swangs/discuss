import {
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL
} from '../actions/channel_actions';
import { LOGOUT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

const _nullMessages = {
  messages: null
};

const messagesReducer = (oldState = _nullMessages, action) => {
  Object.freeze(oldState);
  let newState;
  switch (action.type) {
    case RECEIVE_CHANNEL:
      const messages = action.currentChannel.messages;
      return { messages };
    case REMOVE_CHANNEL:
      return _nullMessages;
    case LOGOUT_USER:
      return _nullMessages;
    default:
      return oldState;
  }
};

export default messagesReducer;
