json.extract! @server, :id, :name, :owner_id
json.set! :channels do
  json.array! @server.channels, :id, :name
end

json.set! :users do
  json.array! @server.users, :username, :id
end
