class EventsController < ApplicationController
  def search
    unless @location = Location.find_by_user_input_location_name(params[:user_input_location_name])
      @location = Songkick.location_id_query(params[:user_input_location_name]).first
      @location.save
    end
    event_query = format_event_query(params, @location)
    @events = Songkick.event_search(event_query)
    render json: { location_coords: { lat: @location.lat, lng: @location.lng }, events: @events }
  end

  private

  def format_event_query(params, location)
    location = "sk:#{location.sk_location_id}"
    min_date = params[:min_date]
    max_date = params[:max_date]
    return {location: location, artist_name: params[:artist_name], min_date: min_date, max_date: max_date}
  end

  def format_date(date)
    return "" if date == ""
    year = date["(1i)"]
    month = date["(2i)"]
    day = date["(3i)"]
    formatted_date = '%04d-%02d-%02d' % [year, month, day]
  end
end