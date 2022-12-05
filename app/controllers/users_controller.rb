class UsersController < ApplicationController
    
    def index
        render json: User.all, status: :ok
    end

    def show
        #
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
        render json: {errors: record.record.errors}
    end

    private

    def permitted_params
        params.permit(:email, :password, :password_confirmation, :name)
    end
end
