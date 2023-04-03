class Api::UsersController < ApplicationController
    
    def index
        render json: User.all, status: :ok
    end

    def show
        # use this for staying logged in
        user = User.find(session[:uid])
        if user
            render json: user, status: :ok
        else
            render json: {error: "Not logged in"}, status: :unauthorized
        end
    rescue ActiveRecord::RecordNotFound => e
        render json: {error: "User not logged in"}, status: :not_found
    end

    def create
        # use this for signing up
        user = User.create!(permitted_params)
        render json: user, status: :created
    rescue ActiveRecord::RecordInvalid => record
        render json: {errors: record.record.errors}, status: :unprocessable_entity
    end

    private

    def permitted_params
        params.permit(:email, :password, :password_confirmation, :name)
    end
end
