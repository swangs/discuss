json.extract! @server, :id, :name, :owner_id

# json.set! :channels do
#   json.array! @server.channels, :id, :name
# end

json.set! :channels do
  channel = @server.channels.select(:id, :name)
  direct_message_channels = @server.direct_message_channels.select(:id, :name)
  json.array! (channel + direct_message_channels)
end

json.set! :users do
  json.array! @server.users, :username, :id
end
