class GroupMessage < ApplicationRecord
    # Associations
    belongs_to :user
    belongs_to :group
    has_many :replies, class_name: "GroupMessage", foreign_key: "comment_id"
    belongs_to :quoted_comment, class_name: "GroupMessage", optional: true
end
