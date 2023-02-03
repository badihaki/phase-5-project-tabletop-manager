class Api::CharactersController < ApplicationController
    def index
        return render json: {error: "Please sign in"}, status: :unauthorized unless session.include?(:uid)
        chararacters = User.find(session[:uid]).characters
        render json: chararacters, status: :ok
    end

    def create
        return render json: {error: "Please sign in"}, status: :unauthorized unless session.include?(:uid)
        new_character = Character.new(create_params)
        new_character.user_id = session[:uid]
        new_character.level = 0;
        new_character.save!
        render json: new_character, status: :created
    rescue ActiveRecord::RecordInvalid => obj
        render json: {errors: obj.record.errors}, status: :unprocessable_entity
    end

    def update
        return render json: {error: "Please sign in"}, status: :unauthorized unless session.include?(:uid)
        character = Character.find(params[:id])
        character.update!(update_params)
        render json: character, status: :ok
    rescue ActiveRecord::RecordInvalid => obj
        render json: {errors: obj.record.errors}, status: :unprocessable_entity
    end

    def destroy
        return render json: {error: "Please sign in"}, status: :unauthorized unless session.include?(:uid)
        toon = Character.find(params[:id])
        toon.destroy!
        head :no_content
    end

    private

    def create_params
        params.permit(:user_id, :name, :history, :stats)
    end

    def update_params
        params.permit(:stats, :level, :history)
    end
end
