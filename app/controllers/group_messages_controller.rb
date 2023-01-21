class GroupMessagesController < ApplicationController
    
    def index
        return render json: {error: "Not authorized to view this, please sign in"}, status: :unauthorized unless session.include?(:uid)
        render json: GroupMessage.all, status: :ok
    end

    def create
        # user = User.find_by(session[:uid])
        message = GroupMessage.create!(permitted_params)
        if(message.valid?)
            # ActionCable.server.broadcast 'public_chat', message.content
            ActionCable.server.broadcast 'public_chat', message
            render json: message, status: :ok
        end
    end

    private

    def permitted_params
        params.permit(:content, :user_id, :group_id, :comment_id)
    end
    
end
