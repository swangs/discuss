@channels.each do |channel|
  json.extract! channel, :id, :name
end
