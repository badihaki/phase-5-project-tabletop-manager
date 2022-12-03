class CreateMemberships < ActiveRecord::Migration[7.0]
  def change
    create_table :memberships do |t|
      t.integer :player_id
      t.integer :group_id
      t.string :player_experience_summary

      t.timestamps
    end
  end
end
