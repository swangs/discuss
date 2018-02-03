export const getChannels = (serverId) => {
    return $.ajax({
      url: `api/servers/${serverId}/channels`,
      method: "GET"
    });
};

export const getChannel =  (channeId) => {
  return $.ajax({
    url: `api/channels/${channelId}`,
    method: "GET",
  });
};

export const postChannel = (channel) => {
  return $.ajax({
    url: 'api/channels',
    method: "POST",
    data: { channel }
  });
};
