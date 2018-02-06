export const getServers = () => {
  return $.ajax({
    url: 'api/servers',
    method: "GET"
  });
};

export const getServer =  (serverId) => {
  return $.ajax({
    url: `api/servers/${serverId}`,
    method: "GET",
  });
};

export const postServer = (server) => {
  return $.ajax({
    url: 'api/servers',
    method: "POST",
    data: { server }
  });
};

export const deleteServer = (serverId) => {
  return $.ajax({
    url: `api/servers/${serverId}`,
    method: "DELETE",
  });
};

export const joinServer = (serverName) => {
  return $.ajax({
    url: "api/server_memberships",
    method: "POST",
    data: serverName
  });
};

export const leaveServer = (membershipInfo) => {
  return $.ajax({
    url: "api/server_memberships/delete",
    method: "DELETE",
    data: membershipInfo
  });
};
