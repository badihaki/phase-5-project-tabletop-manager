class CreateGroupMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :group_messages do |t|
      t.integer :user_id
      t.integer :group_id
      t.integer :comment_id
      t.text :content

      t.timestamps
    end
  end
end
