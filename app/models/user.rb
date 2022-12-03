class User < ApplicationRecord
    has_secure_password

    # Associations
    has_many :memberships
    has_many :groups, through: :memberships
end
