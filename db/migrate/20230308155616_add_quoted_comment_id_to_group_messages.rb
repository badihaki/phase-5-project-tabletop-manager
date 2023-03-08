class AddQuotedCommentIdToGroupMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :group_messages, :quoted_comment_id, :int
  end
end
