class Api::MembershipsController < ApplicationController

    def index
        render json: Membership.all, status: :ok
    end

    def create
        new_membership = Membership.create!(permitted_params)
        render json: new_membership, status: :created
    rescue ActiveRecord::RecordInvalid => err
        render json: {errors: err.record.errors}, status: :unprocessable_entity
    end

    private

    def permitted_params
        params.permit(:player_id, :group_id, :player_experience_summary)
    end

end
