# == Schema Information
#
# Table name: servers
#
#  id             :integer          not null, primary key
#  name           :string           not null
#  owner_id       :integer          not null
#  direct_message :boolean
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Server < ApplicationRecord
  validates :name, :owner, presence: true;

  belongs_to :owner,
  primary_key: :id,
  foreign_key: :owner_id,
  class_name: :User
end
