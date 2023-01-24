class GroupMessageSerializer < ActiveModel::Serializer
  attributes :id, :group_id, :comment_id, :content, :user
end
