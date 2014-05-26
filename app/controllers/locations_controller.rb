class LocationsController < ApplicationController
  def search
    current_location = Songkick.location_coords_query(params)

    render json: current_location
  end
end