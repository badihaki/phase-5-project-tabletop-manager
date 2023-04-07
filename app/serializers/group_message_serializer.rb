class GroupMessageSerializer < ActiveModel::Serializer
  attributes :id, :group_id, :comment_id, :content, :user, :replies, :quoted_comment_id
  belongs_to :group
end
