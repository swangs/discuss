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
User.create(username: "swango", password: "master")
User.create(username: "demouser", password: "demouser")
User.create(username: "user1", password: "password")
User.create(username: "user2", password: "password")
User.create(username: "user3", password: "password")
User.create(username: "user4", password: "password")
User.create(username: "user5", password: "password")

Server.create(name: "swangoServer", owner_id: 1, direct_message: true)
Server.create(name: "demouserServer", owner_id: 2, direct_message: true)
Server.create(name: "user1Server", owner_id: 3, direct_message: true)
Server.create(name: "user2Server", owner_id: 4, direct_message: true)
Server.create(name: "user3Server", owner_id: 5, direct_message: true)
Server.create(name: "user4Server", owner_id: 6, direct_message: true)
Server.create(name: "user5Server", owner_id: 7, direct_message: true)

# Public Servers
Server.create(name: "App Academy", owner_id: 1)
Server.create(name: "testing", owner_id: 1)
Server.create(name: "the", owner_id: 1)
Server.create(name: "css", owner_id: 1)
Server.create(name: "scrollbar", owner_id: 1)
Server.create(name: "for", owner_id: 1)
Server.create(name: "overflow", owner_id: 1)
Server.create(name: "y", owner_id: 1)
Server.create(name: "is", owner_id: 1)
Server.create(name: "this", owner_id: 1)
Server.create(name: "enough", owner_id: 1)
Server.create(name: "servers", owner_id: 1)
Server.create(name: "yet", owner_id: 1)
