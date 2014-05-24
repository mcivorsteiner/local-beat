class EventsController < ApplicationController
  def search #params => {location: ___, artist_name: ____, min_date: ____, max_date:___}
    unless @location = Location.find_by_user_input_location_name(params[:location])
      @location = Songkick.location_id_query(params[:location]).first
      @location.save
    end
    @events = Songkick.event_search({ location: "sk:#{@location.sk_location_id}", artist_name: params[:artist_name], min_date: params[:min_date], max_date: params[:max_date]})
    render json: { location_coords: { lat: @location.lat, lng: @location.lng }, events: @events }
  end
end