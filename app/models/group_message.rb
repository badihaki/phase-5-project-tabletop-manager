class GroupMessage < ApplicationRecord
    after_create_commit { broadcast_message }
    
    # Associations
    has_many :replies, class_name: "GroupMessage", foreign_key: "comment_id"
    belongs_to :quoted_comment, class_name: "GroupMessage", optional: true
    belongs_to :user
    belongs_to :group

    # Validations
    validates :group_id, presence: true
    validates :user_id, presence: true

    private

    def broadcast_message
        # debugger
        ## ActionCable.server.broadcast('public_chat',{
        ##     id: self.id,
        ##     body: self.content,
        ##     group_id: self.group_id,
        ##     user: self.user
        ## })
        ActionCable.server.broadcast('public_chat', self)
    end
end
