import * as ServerApiUtil from '../util/server_util';

export const RECEIVE_ALL_SERVERS = "RECEIVE_ALL_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_SERVER_ERRORS = "RECEIVE_SERVER_ERRORS";

const receiveServers = (servers) => {
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

export const getServers = () => dispatch => {
  return ServerApiUtil.getServers().then(
    servers => dispatch(receiveServers(servers)),
    error => dispatch(receiveServerErrors(error.responseJSON))
  );
};

export const getServer = (serverId) => dispatch => {
  return ServerApiUtil.getServer(serverId).then(
    server => dispatch(receiveServer(server)),
    error => dispatch(receiveServerErrors(error.responseJSON))
  );
};

export const postServer = (formServer) => dispatch => {
  return ServerApiUtil.postServer(formServer).then(
    server => dispatch(receiveServer(server)),
    error => dispatch(receiveServerErrors(error.responseJSON))
  );
};

export const deleteServer = (serverId) => dispatch => {
  return ServerApiUtil.deleteServer(serverId).then(
    servers => dispatch(receiveServers(servers)),
    error => dispatch(receiveServerErrors(error.responseJSON))
  );
};

export const joinServer = (serverName) => dispatch => {
  return ServerApiUtil.joinServer(serverName).then(
    server => dispatch(receiveServer(server)),
    error => dispatch(receiveServerErrors(error.responseJSON))
  );
};
