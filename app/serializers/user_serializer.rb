class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :password_digest, :mastered_groups, :groups
end
