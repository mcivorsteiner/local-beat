class User < ActiveRecord::Base
  has_secure_password
  belongs_to :location

  attr_accessible :email

  EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  validates :email, :presence => true, :uniqueness => true, :format => EMAIL_REGEX
  validates :location, presence: true
end