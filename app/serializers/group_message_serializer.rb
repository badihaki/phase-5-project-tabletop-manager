class GroupMessageSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :group_id, :comment_id, :content
end
