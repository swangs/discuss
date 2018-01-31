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

require 'test_helper'

class ServerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
