class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :level, :history, :stats
end
