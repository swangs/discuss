# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
Server.delete_all

# Users and UserServers
User.create(username: "discussBOT", password: "master")
User.create(username: "swango", password: "master")
User.create(username: "demouser", password: "demouser")
User.create(username: "user1", password: "password")
User.create(username: "user2", password: "password")
User.create(username: "user3", password: "password")
User.create(username: "user4", password: "password")
User.create(username: "user5", password: "password")
User.create(username: "user6", password: "password")
User.create(username: "user7", password: "password")


Server.create(name: "discussBOTServer", owner_id: 1, direct_message: true)
Server.create(name: "swangoServer", owner_id: 2, direct_message: true)
Server.create(name: "demouserServer", owner_id: 3, direct_message: true)
Server.create(name: "user1Server", owner_id: 4, direct_message: true)
Server.create(name: "user2Server", owner_id: 5, direct_message: true)
Server.create(name: "user3Server", owner_id: 6, direct_message: true)
Server.create(name: "user4Server", owner_id: 7, direct_message: true)
Server.create(name: "user5Server", owner_id: 8, direct_message: true)
Server.create(name: "user6Server", owner_id: 9, direct_message: true)
Server.create(name: "user7Server", owner_id: 10, direct_message: true)


ServerMembership.create(server_id: 1, user_id: 1)
ServerMembership.create(server_id: 2, user_id: 2)
ServerMembership.create(server_id: 3, user_id: 3)
ServerMembership.create(server_id: 4, user_id: 4)
ServerMembership.create(server_id: 5, user_id: 5)
ServerMembership.create(server_id: 6, user_id: 6)
ServerMembership.create(server_id: 7, user_id: 7)
ServerMembership.create(server_id: 8, user_id: 8)
ServerMembership.create(server_id: 9, user_id: 9)
ServerMembership.create(server_id: 10, user_id: 10)

# Public Servers
Server.create(name: "Demo Server", owner_id: 1)
Server.create(name: "App Academy", owner_id: 1)
Server.create(name: "Chat", owner_id: 1)

ServerMembership.create(server_id: 11, user_id: 1)
ServerMembership.create(server_id: 12, user_id: 1)
ServerMembership.create(server_id: 13, user_id: 1)
ServerMembership.create(server_id: 11, user_id: 2)
ServerMembership.create(server_id: 12, user_id: 2)
ServerMembership.create(server_id: 13, user_id: 2)
ServerMembership.create(server_id: 11, user_id: 3)
ServerMembership.create(server_id: 12, user_id: 3)
ServerMembership.create(server_id: 13, user_id: 3)
