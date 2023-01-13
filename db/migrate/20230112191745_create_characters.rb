class CreateCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :characters do |t|
      t.integer :user_id
      t.string :name
      t.integer :level
      t.text :history
      t.text :stats

      t.timestamps
    end
  end
end
