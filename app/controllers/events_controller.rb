class EventsController < ApplicationController
  def search #params => {location: ___, artist_name: ____, min_date: ____, max_date:___}
    unless @location = Location.find_by_user_input_location_name(params[:user_input_location_name])
      @location = Songkick.location_id_query(params[:user_input_location_name]).first
      @location.save
    end
    puts "LOCATION: " + @location.sk_location_id.to_s
    p "PARAMS#{params}"
    query = { location: "sk:#{@location.sk_location_id}", artist_name: params[:artist_name], min_date: params[:min_date], max_date: params[:max_date]}
    p "QUERY:#{query}"
    @events = Songkick.event_search({ location: "sk:#{@location.sk_location_id}"})#, artist_name: params[:artist_name], min_date: params[:min_date], max_date: params[:max_date]})
    render json: { location_coords: { lat: @location.lat, lng: @location.lng }, events: @events }
  end
end