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

    def destroy
        # use this for logging out
        # sessions.delete :uid
        session.delete(:uid)
        head :no_content
        # head :no_content
    end

    private
end
