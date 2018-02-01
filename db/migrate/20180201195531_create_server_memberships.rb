class CreateServerMemberships < ActiveRecord::Migration[5.1]
  def change
    create_table :server_memberships do |t|
      t.integer :server_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :server_memberships, [:server_id, :user_id], unique: true;
    add_index :server_memberships, :user_id
  end
end
