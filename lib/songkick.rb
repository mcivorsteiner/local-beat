module Songkick
  extend self
  include HTTParty
  base_uri 'http://api.songkick.com/api/3.0'
  SONGKICK_KEY = ENV['SONGKICK_KEY']

  def artist_search_url(artist_name)
    query = artist_name.gsub(/\s/, "+")
    return "/search/artists.json?query=#{query}&apikey=#{SONGKICK_KEY}"
  end

  def location_search_url(location_name)
    query = location_name.gsub(/\s/, "+")
     "/search/locations.json?query=#{query}&apikey=#{SONGKICK_KEY}"
  end

  def location_search_coords_url(coordsObj)
     "/search/locations.json?location=geo:#{coordsObj[:lat]},#{coordsObj[:lng]}&apikey=#{SONGKICK_KEY}"
  end

  def request(url, query = {})
    response = get(url, query: query)
    JSON.parse(response.body)
  end

  def artist_id_query(artist_name)
    url = artist_search_url(artist_name)
    response = request(url)
    artists = response["resultsPage"]["results"]["artist"].map do |artist|
      {display_name: artist["displayName"], sk_artist_id: artist["id"], uri: artist["uri"]}
      Artist.new(name: artist["displayName"], sk_artist_id: artist["id"])
    end
    artists
  end

  def location_coords_query(coordsObj)
    url = location_search_coords_url(coordsObj)
    response = request(url)
    metro_area = response["resultsPage"]["results"]["location"].first["metroArea"]

    current_location = {
      display_name: metro_area["displayName"],
      lat: metro_area["lat"],
      lng: metro_area["lng"]
    }
  end

  def location_id_query(location_query)
    url = location_search_url(location_query)
    response = request(url)
    locations = response["resultsPage"]["results"]["location"].map do |location|
      location_name = location["metroArea"]["displayName"] rescue nil
      sk_location_id = location["metroArea"]["id"].to_i rescue nil
      state = location["metroArea"]["state"]["displayName"] rescue nil
      country = location["metroArea"]["country"]["displayName"] rescue nil
      lat = location["metroArea"]["lat"].to_f rescue nil
      lng = location["metroArea"]["lng"].to_f rescue nil
      Location.new(sk_location_id: sk_location_id, sk_location_name: location_name, user_input_location_name: location_query.downcase, state: state, country: country, lat: lat, lng: lng)
    end
    locations
  end

  # ==== Query Parameters
  # * +type+ - valid types: concert or festival
  # * +artists+ - events by any of the artists, comma-separated
  # * +artist_name+ - plain text name of artist ex. 'As I Lay Dying', 'Parkway Drive', 'Animals As Leaders'
  # * +artist_id+ - Songkick unique ID for an artist
  # * +venue_id+ - Songkick unique ID for a venue
  # * +setlist_item_name+ - name of a song which was played at the event – use with artist_id or artist_name
  # * +min_date+ - Oldest date for which you want to look for events
  # * +max_date+ - Most recent date for which you want to look for events
  # * +location+ - See the Songkick website for instructions on how to use the location parameter http://www.songkick.com/developer/location-search

  def event_search(query = {})
    query = query.reject { |key, value| value.empty? }
    url = "/events.json?apikey=#{SONGKICK_KEY}"
    response = request(url, query)
    events = response["resultsPage"]["results"]["event"]
    extract_event_data(events)
  end

  def extract_event_data(events)
    events_data = events.map do |event|
      sk_event_id = event["id"].to_i rescue nil
      display_name = event["displayName"] rescue nil
      date = event['start']['date'] rescue nil
      time = event['time'] rescue nil
      artists = event["performance"].map { |performance| performance["artist"]["displayName"]} rescue nil
      headliner = event["performance"].select { |performance| performance["billingIndex"] == 1 }.map { |performance| performance["artist"]["displayName"]} rescue nil
      metro_area = event["venue"]["metroArea"]["displayName"] rescue nil
      state = event["venue"]["metroArea"]["state"]["displayName"] rescue nil
      venue_name = event["venue"]["displayName"] rescue nil
      popularity = event["popularity"].to_f rescue nil
      location = [event["location"]["lat"].to_f, event["location"]["lng"].to_f] rescue nil
      event_type = event["type"] rescue nil
      uri = event["uri"] rescue nil
      { sk_event_id: sk_event_id, display_name: display_name, date: date, artists: artists, headliner: headliner, metro_area: metro_area, state: state, venue_name: venue_name, popularity: popularity, location: location, event_type: event_type, uri: uri, time: time }
    end
    events_data.reject { |event| event[:location][0] == 0 }
  end
end