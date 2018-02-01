# == Schema Information
#
# Table name: server_memberships
#
#  id         :integer          not null, primary key
#  server_id  :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ServerMembership < ApplicationRecord
  validates :server_id, :user_id, presence: true

  belongs_to :server
  belongs_to :user
end
