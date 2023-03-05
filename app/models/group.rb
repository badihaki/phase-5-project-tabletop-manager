class Group < ApplicationRecord
    # Associations
    belongs_to :game_master, class_name: "User"
    has_many :memberships, dependent: :destroy
    has_many :players, through: :memberships, source: :player
    has_many :group_messages, dependent: :destroy

    # Validations
    validates :name, presence: true, uniqueness: true
    validates :game_master_id, presence: true
    validates :game, presence: true
    validates :game_day, presence: true
end
