json.extract! @channel, :id, :name
json.set! :messages do
  json.array! @channel.messages, :id, :content, :author_id, :created_at
end
