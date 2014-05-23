class Location < ActiveRecord::Base
  attr_accessible :user_input_location_name, :songkick_location_name, :songkick_location_id, :latitude, :longitude
end