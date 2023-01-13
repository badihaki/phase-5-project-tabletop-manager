class CharactersController < ApplicationController
    def index
        render json: Character.all, status: :ok
    end
end
