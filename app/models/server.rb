# == Schema Information
#
# Table name: servers
#
#  id             :integer          not null, primary key
#  name           :string           not null
#  owner_id       :integer          not null
#  direct_message :boolean          default(FALSE)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Server < ApplicationRecord
  validates :name, :owner, presence: true
  validates :name, length: { maximum: 20 }, uniqueness: true

  belongs_to :owner,
  primary_key: :id,
  foreign_key: :owner_id,
  class_name: :User

  has_many :server_memberships

  has_many :users,
  through: :server_memberships
end
