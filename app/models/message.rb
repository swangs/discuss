# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  content    :text             not null
#  author_id  :integer          not null
#  server_id  :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ApplicationRecord
  validates :content, :author, :channel, presence: true
  validates :content, length: { minimum: 1 } 

  belongs_to :author,
  primary_key: :id,
  foreign_key: :author_id,
  class_name: :User

  belongs_to :channel

  after_create_commit do
    ChatMessageCreationEventBroadcastJob.perform_later(self)
  end
end
