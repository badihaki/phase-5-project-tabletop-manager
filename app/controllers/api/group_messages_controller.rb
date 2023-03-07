class Api::GroupMessagesController < ApplicationController
    
    def index
        return render json: {error: "Not authorized to view this, please sign in"}, status: :unauthorized unless session.include?(:uid)
        render json: GroupMessage.all, status: :ok
    end

    def create
        message = GroupMessage.create!(permitted_params)
        # message.user = User.find(message.user_id)
        if(message.valid?)
            message_to_broadcast = {
                id: message.id,
                content: message.content,
                group_id: message.group_id,
                user_id: message.user_id,
                user: message.user
            }
            # debugger
            ActionCable.server.broadcast 'public_chat', message
            # ActionCable.server.broadcast 'public_chat', message_to_broadcast
            # message.broadcast_message
            render json: message, status: :ok
        end
    end

    private

    def permitted_params
        params.permit(:content, :user_id, :group_id, :comment_id)
    end
    
end
