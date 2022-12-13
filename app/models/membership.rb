class Membership < ApplicationRecord
    # Associations
    belongs_to :player, class_name: "User"
    belongs_to :group

    # Validations
    validates :player_id, presence: true
    validates :group_id, presence: true
    validates :player_experience_summary, presence: true
    validate :check_if_player_is_game_master
    validate :is_player_already_in_group

    private

    def check_if_player_is_game_master
        group = Group.find(group_id)
        player = User.find(player_id)
        if(group.game_master == player)
            errors.add(:player_id, "Can't be a player in a group you GM for")
        end
    end

    def is_player_already_in_group
        # debugger
        group = Group.find(group_id)
        player = User.find(player_id)
        if group.players.include?(player)
            errors.add(:player_id, "Player is already in this group")
        end
    end
end
