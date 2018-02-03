myServer = user.owned_servers.where(direct_message: true)

json.extract! user, :id, :username
json.set! :myServer, myServer.first.id
json.set! :myChannel, myServer.first.channels.first.id
