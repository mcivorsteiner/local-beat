require 'pp'
module Songkick
  extend self
  include HTTParty
  base_uri 'http://api.songkick.com/api/3.0'

#get location ID- accepting user input and determing metro area and corresponding ID
#create new Location if location doesn't already exist in DB
    def location_search_url(location_name)
      query = location_name.gsub(/\s/, "+")
       "/search/locations.json?query=#{query}&apikey=#{ENV["SONGKICK_KEY"]}"
    end

    def request(url, query = {})
      response = get(url, query: query)
      JSON.parse(response.body)
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
        {location_name: location_name, sk_location_id: sk_location_id, state: state, country: country, lat: lat, lng: lng}
      end
      locations
    end

    def event_search(query = {})
      url = "/events.json?apikey=#{ENV["SONGKICK_KEY"]}"
      response = request(url, query)
      events = response["resultsPage"]["results"]["event"]
      extract_event_data(events)
    end


    def extract_event_data(events)
        events_data = events.map do |event|
          sk_event_id = event["id"].to_i rescue nil
          display_name = event["displayName"] rescue nil
          date = event['start']['date'] rescue nil
          artists = event["performance"].map { |performance| performance["artist"]["displayName"]} rescue nil
          headliner = event["performance"].select { |performance| performance["billingIndex"] == 1 }.map { |performance| performance["artist"]["displayName"]} rescue nil
          type = event["type"]
          metro_area = event["venue"]["metroArea"]["displayName"] rescue nil
          state = event["venue"]["metroArea"]["state"]["displayName"] rescue nil
          # metro_area_loc = [event["venue"]["metroArea"]["lat"].to_f, event["venue"]["metroArea"]["lng"].to_f] rescue nil
          venue_name = event["venue"]["displayName"] rescue nil
          popularity = event["popularity"].to_f rescue nil
          location = [event["location"]["lat"].to_f, event["location"]["lng"].to_f] rescue nil
          event_type = event["type"] rescue nil
          uri = event["uri"] rescue nil
          { sk_event_id: sk_event_id, display_name: display_name, date: date, artists: artists, headliner: headliner, type: type, metro_area: metro_area, state: state, venue_name: venue_name, popularity: popularity, location: location, event_type: event_type, uri: uri }
        end
        events_data.reject { |event| event[:location][0] == 0 }
      end

end