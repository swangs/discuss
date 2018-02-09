myServer = user.owned_servers.where(direct_message: true)

json.set! :currentUser do
  json.extract! user, :id, :username
  json.set! :myServer, myServer.first.id
  json.set! :myChannel, myServer.first.direct_message_channels.first.id
  json.image_url asset_path(user.avatar.url)
end
json.set! :allUsers, User.all
