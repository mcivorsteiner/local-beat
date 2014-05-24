class Location < ActiveRecord::Base
  attr_accessible :user_input_location_name, :sk_location_name, :sk_location_id, :lat, :lng, :state, :country

  validates :sk_location_id, presence: {message: "Unable to find location based on city/state entered"}
end