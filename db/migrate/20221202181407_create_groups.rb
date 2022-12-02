class CreateGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :groups do |t|
      t.integer :game_master_id
      t.string :name
      t.string :game_day
      t.string :game

      t.timestamps
    end
  end
end
