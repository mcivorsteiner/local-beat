class LocationsController < ApplicationController
  def search
    response = Songkick.event_search_by_lat_lng(params)

    if location = Location.find_by_sk_location_id(response[:metro_area_id])
      location_info = {lat: location.lat, lng: location.lng}

    else
      location_info = Songkick.location_coords_query(params)
    end

    render json: {events: response[:events], location_coords: {lat: location_info[:lat], lng: location_info[:lng]}, location_name: location.sk_location_name}
  end
end