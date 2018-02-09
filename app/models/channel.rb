# == Schema Information
#
# Table name: channels
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  server_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ApplicationRecord
  validates :name, presence: true

  belongs_to :server,
  optional: true

  has_many :messages, dependent: :destroy

  has_many :direct_message_memberships
  has_many :direct_message_servers,
  through: :direct_message_memberships,
  source: :server

end
