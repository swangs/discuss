json.extract! @server, :id, :name, :owner_id
json.set! :channels do
  json.array! @server.channels, :id, :name
end
