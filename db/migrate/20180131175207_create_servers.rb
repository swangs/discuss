class CreateServers < ActiveRecord::Migration[5.1]
  def change
    create_table :servers do |t|
      t.string :name, null: false
      t.integer :owner_id, null: false
      t.boolean :direct_message, default: false

      t.timestamps
    end
    add_index :servers, :name, unique: true
    add_index :servers, :owner_id
  end
end
