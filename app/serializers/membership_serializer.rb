class MembershipSerializer < ActiveModel::Serializer
  attributes :id, :player_id, :group_id, :player_experience_summary
end
