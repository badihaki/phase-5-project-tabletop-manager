class Group < ApplicationRecord
    # Associations
    belongs_to :game_master, class_name: "User"
    has_many :memberships
    has_many :players, through: :memberships, source: :player

    # Validations
end
