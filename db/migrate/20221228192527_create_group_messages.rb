class CreateGroupMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :group_messages do |t|
      t.integer :user_id
      t.integer :group_id
      t.text :content
      t.references :comment, foreign_key: {to_table: :group_messages}

      t.timestamps
    end
  end
end
