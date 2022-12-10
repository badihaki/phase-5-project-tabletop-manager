class GroupsController < ApplicationController

    def index
        debugger
        if(params[:user_id])
            user = User.find(params[:user_id])
            # debugger
            render json: user.groups, status: :ok
        else
            render json: Group.all, status: :ok
        end
    end

end
