class SessionsController < ApplicationController
    # we'll use the session controller to control loggin in/out

    def create
        # use this for logging in
        # find the user by the username
        user = User.find_by(email: params[:email])
        # debugger
        if user&.authenticate(params[:password])
            session[:uid] = user.id
            render json: user, status: :accepted
        end
    rescue ActiveRecord::RecordNotFound => err
        render json: {errors: err.record.errors}, status: :not_found
        # check if the user is valid and authenticate the password using params
        # if everything checks out:
            # store the user id in sessions[:uid] and render the user to the frontend
        # else
            # render errors to the front end
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
