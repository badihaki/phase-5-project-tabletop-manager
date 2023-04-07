class Api::GroupsController < ApplicationController

    def index
        # debugger
        if(params[:user_id])
            check_if_logged_in
            user = User.find(params[:user_id])
            render json: user.groups, status: :ok
        else
            render json: Group.all, status: :ok
        end
    end

    def show
        if(params[:user_id])
            check_if_logged_in
            user = User.find(session[:uid])
            render json: user.groups, status: :ok
        else
            group = Group.find(params[:id])
            render json: group, status: :ok
        end
    end

    def create
        check_if_logged_in
        group = Group.new(permitted_params)
        group.is_active = false
        group.save
        render json: group, status: :created
    rescue ActiveRecord::RecordInvalid => err
        render json: {errors: err.record.errors}, status: :unprocessable_entity
    end

    def update
        check_if_logged_in
        group = find_group_by_id
        gm_authorization_check(group)
        group.update!(permitted_params)
        render json: group, status: :accepted
    rescue ActiveRecord::RecordInvalid => err
        render json: {errors: err.record.errors}, status: :unprocessable_entity
    rescue ActiveRecord::RecordNotFound
        render json: {error: "Data not found"}
    end

    def destroy
        check_if_logged_in
        group = find_group_by_id
        gm_authorization_check(group)
        group.destroy
        return render json:{message: "group deleted successfully" }, status: :accepted
    rescue ActiveRecord::RecordNotFound
        render json: {error: "Data not found! Can't destroy a record that doesn't exist."}
    end

    private

    def permitted_params
        params.permit(:name, :game_day, :game, :game_master_id, :is_active)
    end

    def check_if_logged_in
        return render json: {error: "Not authorized to view this, please sign up or log in"}, status: :unauthorized unless session.include?(:uid)
    end

    def gm_authorization_check group
        return render json: {error: "Not authorized to edit/delete this group."}, status: :unauthorized unless session[:uid] == group.game_master.id
    end

    def find_group_by_id
        return Group.find(params[:id])
    end

end
