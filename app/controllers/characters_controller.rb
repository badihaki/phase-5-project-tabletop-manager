class CharactersController < ApplicationController
    def index
        return render json: {error: "Please sign in"}, status: :unauthorized unless session.include?(:uid)
        chararacters = User.find(session[uid]).characters
        render json: chararacters, status: :ok
    end

    def create
        return render json: {error: "Please sign in"}, status: :unauthorized unless session.include?(:uid)
        new_character = Character.create!(create_params)
        render json: new_character, status: :created
    rescue ActiveRecord::RecordInvalid => obj
        render json: {errors: obj.record.errors}, status: :unprocessable_entity
    end

    private

    def create_params
        params.permit(:user_id, :name)
    end

    def update_params
        params.permit(:stats, :level, :history)
    end
end
