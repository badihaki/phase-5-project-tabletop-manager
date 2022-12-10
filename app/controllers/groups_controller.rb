class GroupsController < ApplicationController

    def index
        # debugger
        if(params[:user_id])
            user = User.find(params[:user_id])
            debugger
            render json: user.groups, status: :ok
        else
            render json: Group.all, status: :ok
        end
    end

    def create
        group = Group.new(permitted_params)
        group.game_master_id = params[:user_id]
        group.save!
        # debugger
        render json: group, status: :created
    rescue ActiveRecord::RecordInvalid => err
        render json: {errors: err.record.errors}, status: :unprocessable_entity
    end

    private

    def permitted_params
        params.permit(:name, :game_day, :game)
    end

end
