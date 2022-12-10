class MembershipsController < ApplicationController

    def create
        new_membership = Membership.create!(permitted_params)
        render json: new_membership, status: :created
    rescue ActiveRecord::RecordNotFound => err
        render json: {errors: err.record.errors}
    end

    private

    def permitted_params
        params.permit(:palyer_id, :group_id, :experience)
    end

end
