class GroupMessagesController < ApplicationController
    
    def create
        # user = User.find_by(session[:uid])
        message = GroupMessage.create!(permitted_params)
        if(message.valid?)
            ActionCable.server.broadcast 'public_chat', message.content
            render json: message, status: :ok
        end
    end

    private

    def permitted_params
        params.permit(:content, :user_id, :group_id, :comment_id)
    end
    
end
