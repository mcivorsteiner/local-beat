class Location < ActiveRecord::Base
  attr_accessible :user_input_location_name, :sk_location_name, :sk_location_id, :lat, :lng, :state, :country
end