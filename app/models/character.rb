class Character < ApplicationRecord
    # Associations
    belongs_to :user

    # Validations
    validates :user_id, presence: :true
    validates :name, presence: :true
end
