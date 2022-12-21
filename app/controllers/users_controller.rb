class UsersController < ApplicationController
    
    def index
        render json: User.all, status: :ok
    end

    def show
        #
##         user = User.find(params[:id])
##         render json: user, status: :ok
##     rescue ActiveRecord::RecordNotFound
##         render json: {error: "User not found"}

        # use this for staying logged in
        # find the user by session[uid]
        user = User.find(session[:uid])
        # if found:
        # render the found user
        if user
            render json: user, status: :ok
        else
            render json: {error: "Not logged in"}, status: :unauthorized
        end
        # else:
    rescue ActiveRecord::RecordNotFound => e
        render json: {error: "User not logged in"}, status: :not_found
            # render errors with status: unauthorized
    end

    def create
        # use this for signing up
        # create the user using user_params
        # check if the user is valid
        # if valid:
            # render user with created status
        # else:
            # render errors
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
