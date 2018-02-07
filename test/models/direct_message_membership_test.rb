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

require 'test_helper'

class DirectMessageMembershipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
