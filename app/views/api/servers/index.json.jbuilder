@servers.each do |server|
  json.set! server.id do
    json.extract! server, :id, :name
    json.set! :channels do
      json.array! server.channels, :id, :name
    end
  end
end
