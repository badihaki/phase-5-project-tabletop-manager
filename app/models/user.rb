class User < ApplicationRecord
    has_secure_password

    # Associations
    has_many :memberships
    has_many :groups, through: :memberships

    # validations
    validates :name, presence: true, length: { in: 2..10 }
    validates :password, presence: true, length: { in: 6..12 }, confirmation: true
    validates :email, presence: true, uniqueness: true
    
end
