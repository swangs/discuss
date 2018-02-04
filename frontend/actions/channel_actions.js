import * as ChannelApiUtil from '../util/channel_util';

export const RECEIVE_ALL_CHANNELS = "RECEIVE_ALL_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE_CHANNEL";
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS";

const receiveChannels = (channels) => {
  return {
    type: RECEIVE_ALL_CHANNELS,
    channels
  };
};

const receiveChannel = (currentChannel) => {
  return {
    type: RECEIVE_CHANNEL,
    currentChannel
  };
};

const removeChannel = (channelId) => {
  return {
    type: REMOVE_CHANNEL,
    channelId,
  };
};

const receiveChannelErrors = (errors) => {
  return {
    type: RECEIVE_CHANNEL_ERRORS,
    errors
  };
};

export const clearErrors = () => dispatch => {
  return dispatch(receiveChannelErrors([]));
};

export const getChannels = (serverId) => dispatch => {
  return ChannelApiUtil.getChannels(serverId).then(
    channels => dispatch(receiveChannels(channels)),
    error => dispatch(receiveChannelErrors(error.responseJSON))
  );
};

export const getChannel = (channelId) => dispatch => {
  return ChannelApiUtil.getChannel(channelId).then(
    channel => dispatch(receiveChannel(channel)),
    error => dispatch(receiveChannelErrors(error.responseJSON))
  );
};

export const postChannel = (channelId, formChannel) => dispatch => {
  return ChannelApiUtil.postServer(channelId, formChannel).then(
    channel => dispatch(receiveChannel(channel)),
    error => dispatch(receiveChannelErrors(error.responseJSON))
  );
};

export const deleteChannel = (channelId) => dispatch => {
  return ChannelApiUtil.deleteChannel(channelId).then(
    channel => dispatch(removeChannel(channelId)),
    error => dispatch(receiveChannelErrors(error.responseJSON))
  );
};
