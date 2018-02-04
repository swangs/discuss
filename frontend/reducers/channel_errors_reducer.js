import {
  RECEIVE_ALL_CHANNELS,
  RECEIVE_CHANNEL,
  RECEIVE_CHANNEL_ERRORS
} from '../actions/channel_actions';
import merge from 'lodash/merge';

const channelErrorReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      return [];
    case RECEIVE_CHANNEL:
      return [];
    case RECEIVE_CHANNEL_ERRORS:
      return action.errors;
    default:
      return oldState;
  }
};

export default channelErrorReducer;
