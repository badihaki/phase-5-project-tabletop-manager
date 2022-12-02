class GroupSerializer < ActiveModel::Serializer
  attributes :id, :game_master_id, :name, :game_day, :game
end
