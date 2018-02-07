class CreateDirectMessageMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :direct_message_memberships do |t|
      t.integer :server_id, null: false
      t.integer :channel_id, null: false

      t.timestamps
    end
    
    add_index :direct_message_memberships, [:server_id, :channel_id], unique: true;
    add_index :direct_message_memberships, :channel_id
  end
end
