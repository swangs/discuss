export const fetchPublicServers = () => {
  return $.ajax({
    url: 'api/servers',
    method: "GET"
  });
};
