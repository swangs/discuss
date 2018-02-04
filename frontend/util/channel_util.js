export const getChannels = (serverId) => {
    return $.ajax({
      url: `api/servers/${serverId}/channels`,
      method: "GET"
    });
};

export const getChannel =  (channelId) => {
  return $.ajax({
    url: `api/channels/${channelId}`,
    method: "GET",
  });
};

export const postChannel = (serverId, channel) => {
  return $.ajax({
    url: `api/servers/${serverId}/channels`,
    method: "POST",
    data: { channel }
  });
};

export const deleteChannel = (channelId) => {
  return $.ajax({
    url: `api/channels/${channelId}`,
    method: "DELETE",
  });
};
