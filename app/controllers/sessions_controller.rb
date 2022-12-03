class SessionsController < ApplicationController
    # we'll use the session controller to control loggin in/out
    def create
        # use this for logging in
        # find the user by the username
        user = User.find_by(name: params[:name])
        if user.valid?&.authenticate
            session[:uid] = user.id
            render json: user, status: :accepted
        end
    rescue ActiveRecord::RecordNotFound => err
        render json: {errors: err.record.errors}
        # check if the user is valid and authenticate the password using params
        # if everything checks out:
            # store the user id in sessions[:uid] and render the user to the frontend
        # else
            # render errors to the front end
    end

    def show
        # use this for staying logged in
        # find the user by session[uid]
        # if found:
            # render the found user
        # else:
            # render errors with status: unauthorized
    end

    def destroy
        # use this for logging out
        # sessions.delete :uid
        # head :no_content
    end

    private
end
