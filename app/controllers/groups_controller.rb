class GroupsController < ApplicationController

    def index
        if(params[:user_id])
            user = session.find_by(uid: params[:user_id])
            debugger
            render json: user, include: :groups, status: :ok
            render: json
        else
            render json: Group.all, status: :ok
        end
    end

end
