import * as ServerApiUtil from '../util/server_util';

export const RECEIVE_ALL_SERVERS = "RECEIVE_ALL_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_SERVER_ERRORS = "RECEIVE_SERVER_ERRORS";

const receiveAllServers = (servers) => {
  return {
    type: RECEIVE_ALL_SERVERS,
    servers
  };
};

const receiveServer = (currentServer) => {
  return {
    type: RECEIVE_SERVER,
    currentServer
  };
};

const receiveServerErrors = (errors) => {
  return {
    type: RECEIVE_SERVER_ERRORS,
    errors
  };
};

export const clearErrors = () => dispatch => {
  return dispatch(receiveServerErrors([]));
};

export const getPublicServers = () => dispatch => {
  return ServerApiUtil.getPublicServers().then(
    servers => dispatch(receiveAllServers(servers)),
    error => dispatch(receiveServerErrors(error.responseJSON))
  );
};

export const getServer = (serverId) => dispatch => {
  return ServerApiUtil.getServer(serverId).then(
    currentServer => dispatch(receiveServer(currentServer)),
    error => dispatch(receiveServerErrors(error.responseJSON))
  );
};

export const postServer = (formServer) => dispatch => {
  return ServerApiUtil.postServer(formServer).then(
    currentServer => dispatch(receiveServer(currentServer)),
    error => dispatch(receiveServerErrors(error.responseJSON))
  );
};

export const deleteServer = (serverId) => dispatch => {
  return ServerApiUtil.deleteServer(serverId).then(
    servers => dispatch(receiveAllServers(servers)),
    error => dispatch(receiveServerErrors(error.responseJSON))
  );
};
