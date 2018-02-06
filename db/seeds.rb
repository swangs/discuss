# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Server.delete_all
Channel.delete_all
Message.delete_all

# Users and UserServers
User.create(username: "discussBOT", password: "master")
User.create(username: "swango", password: "master")
User.create(username: "demo", password: "demopassword")
User.create(username: "user1", password: "password")
User.create(username: "user2", password: "password")

Server.create(name: "discussBOTServer", owner_id: 1, direct_message: true)
Server.create(name: "swangoServer", owner_id: 2, direct_message: true)
Server.create(name: "demoServer", owner_id: 3, direct_message: true)
Server.create(name: "user1Server", owner_id: 4, direct_message: true)
Server.create(name: "user2Server", owner_id: 5, direct_message: true)

Channel.create(name: "Welcome to Discuss", server_id: 1)
Channel.create(name: "Welcome to Discuss", server_id: 2)
Channel.create(name: "Welcome to Discuss", server_id: 3)
Channel.create(name: "Welcome to Discuss", server_id: 4)
Channel.create(name: "Welcome to Discuss", server_id: 5)

Message.create(content: "Welcome to Discuss!", author_id: 1, channel_id: 1)
Message.create(content: "Navigate servers using the left sidebar. Create your own server or join a friend's by clicking the + .", author_id: 1, channel_id: 1)
Message.create(content: "Create new channels by opening the Server Options.", author_id: 1, channel_id: 1)
Message.create(content: "Invite friends to your server and chat away!", author_id: 1, channel_id: 1)

Message.create(content: "Welcome to Discuss!", author_id: 1, channel_id: 2)
Message.create(content: "Navigate servers using the left sidebar. Create your own server or join a friend's by clicking the + .", author_id: 1, channel_id: 2)
Message.create(content: "Create new channels by opening the Server Options.", author_id: 1, channel_id: 2)
Message.create(content: "Invite friends to your server and chat away!", author_id: 1, channel_id: 2)

Message.create(content: "Welcome to Discuss!", author_id: 1, channel_id: 3)
Message.create(content: "Navigate servers using the left sidebar. Create your own server or join a friend's by clicking the + .", author_id: 1, channel_id: 3)
Message.create(content: "Create new channels by opening the Server Options.", author_id: 1, channel_id: 3)
Message.create(content: "Invite friends to your server and chat away!", author_id: 1, channel_id: 3)

Message.create(content: "Welcome to Discuss!", author_id: 1, channel_id: 4)
Message.create(content: "Navigate servers using the left sidebar. Create your own server or join a friend's by clicking the + .", author_id: 1, channel_id: 4)
Message.create(content: "Create new channels by opening the Server Options.", author_id: 1, channel_id: 4)
Message.create(content: "Invite friends to your server and chat away!", author_id: 1, channel_id: 4)

Message.create(content: "Welcome to Discuss!", author_id: 1, channel_id: 5)
Message.create(content: "Navigate servers using the left sidebar. Create your own server or join a friend's by clicking the + .", author_id: 1, channel_id: 5)
Message.create(content: "Create new channels by opening the Server Options.", author_id: 1, channel_id: 5)
Message.create(content: "Invite friends to your server and chat away!", author_id: 1, channel_id: 5)

ServerMembership.create(server_id: 1, user_id: 1)
ServerMembership.create(server_id: 2, user_id: 2)
ServerMembership.create(server_id: 3, user_id: 3)
ServerMembership.create(server_id: 4, user_id: 4)
ServerMembership.create(server_id: 5, user_id: 5)

# Public Servers
Server.create(name: "Demo Server", owner_id: 1)
Server.create(name: "App Academy", owner_id: 1)
Server.create(name: "Chat", owner_id: 1)

Channel.create(name: "general", server_id: 6)
Channel.create(name: "discuss public channel", server_id: 6)

Channel.create(name: "general", server_id: 7)
Channel.create(name: "assessment prep", server_id: 7)
Channel.create(name: "circle time", server_id: 7)

Channel.create(name: "general", server_id: 8)
Channel.create(name: "chat about everything", server_id: 8)


ServerMembership.create(server_id: 6, user_id: 1)
ServerMembership.create(server_id: 7, user_id: 1)
ServerMembership.create(server_id: 8, user_id: 1)
ServerMembership.create(server_id: 5, user_id: 2)
ServerMembership.create(server_id: 7, user_id: 2)
ServerMembership.create(server_id: 8, user_id: 2)
ServerMembership.create(server_id: 6, user_id: 3)
ServerMembership.create(server_id: 7, user_id: 3)
ServerMembership.create(server_id: 8, user_id: 3)
