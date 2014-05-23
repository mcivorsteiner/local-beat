class User < ActiveRecord::Base
  has_secure_password
  belongs_to :location

  attr_accessible :email
end