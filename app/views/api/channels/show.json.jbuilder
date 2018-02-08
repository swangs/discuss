json.extract! @channel, :id, :name
json.set! :messages do
  json.array! @channel.messages.order(:id) do |message|
    json.id message.id
    json.content message.content
    json.author message.author.username
    json.created_at message.created_at
  end
end
