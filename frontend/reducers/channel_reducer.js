import {
  RECEIVE_ALL_CHANNELS,
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL
} from '../actions/channel_actions';
import {
  RECEIVE_SERVER,
} from '../actions/server_actions';
import { LOGOUT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

const _nullChannel = {
  currentChannel: null,
  channels: null
};

const channelReducer = (oldState = _nullChannel, action) => {
  Object.freeze(oldState);
  let newState;
  let channels;
  switch (action.type) {
    case RECEIVE_ALL_CHANNELS:
      channels = Object.values(action.channels);
      newState = merge({}, oldState);
      newState.channels = channels;
      return newState;
    case RECEIVE_CHANNEL:
      const currentChannel = action.currentChannel;
      newState = merge({}, oldState);
      newState.currentChannel = currentChannel;
      return newState;
    case REMOVE_CHANNEL:
      newState = merge({}, oldState);
      delete newState.channels[parseInt(action.channelId)];
      return newState;
    case LOGOUT_USER:
      return _nullChannel;
    default:
      return oldState;
  }
};

export default channelReducer;
