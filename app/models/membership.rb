class Membership < ApplicationRecord
    # Associations
    belongs_to :player, class_name: "User"
    belongs_to :group
end
