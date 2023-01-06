class GroupMessage < ApplicationRecord
    after_create_commit { broadcast_message }
    
    # Associations
    belongs_to :user
    belongs_to :group
    has_many :replies, class_name: "GroupMessage", foreign_key: "comment_id"
    belongs_to :quoted_comment, class_name: "GroupMessage", optional: true

    private

    def broadcast_message
        ActionCable.server.broadcast('public_chat',)
    end
end
