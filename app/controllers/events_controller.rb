class EventsController < ApplicationController
  def search
    unless @location = Location.find_by_user_input_location_name(params[:user_input_location_name])
        @location = Songkick.location_id_query(params[:user_input_location_name]).first
    end
    if @location && @location.save
      event_query = format_event_query(params, @location)
      @events = Songkick.event_search(event_query)
      render json: { location_coords: { lat: @location.lat, lng: @location.lng }, events: @events, location_name: @location.sk_location_name }
    else
      render text: "Location not found, try again", status: :unprocessable_entity
    end
  end

  def search_by_sk_location_id
    songkick_location_id = params["songkickLocationId"]
    events = Songkick.event_search({location: "sk:#{songkick_location_id}"})
    unless events == []
      render json: events
    else
      render text: "Location not found, try again", status: :unprocessable_entity
    end
  end

  def detailed_info
    top_song_ids = Echonest.get_tracks_list(params[:sk_artist_id])
    ticket_info = Seatgeek.find_event_with_songkick_artist_id_and_date(params[:sk_artist_id], params[:date] )
    artist_bio = Echonest.get_artist_bio(params[:sk_artist_id])
    artist_pic = Echonest.get_artist_image(params[:sk_artist_id])

    render json: { top_song_ids: top_song_ids, ticket_info: ticket_info, artist_bio: artist_bio, artist_img: artist_pic }
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