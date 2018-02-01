class ServerMembership < ApplicationRecord
  validates :server_id, :user_id, presence: true

  belongs_to :server
  belongs_to :user
end
