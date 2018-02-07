# == Schema Information
#
# Table name: direct_message_memberships
#
#  id         :integer          not null, primary key
#  server_id  :integer          not null
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class DirectMessageMembership < ApplicationRecord
  validates :server_id, :channel_id, presence: true
  validates :server_id, uniqueness: { scope: :channel_id }

  belongs_to :server
  belongs_to :channel
end
