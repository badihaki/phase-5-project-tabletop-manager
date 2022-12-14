class MembershipSerializer < ActiveModel::Serializer
  attributes :id, :player, :group, :player_experience_summary
end
