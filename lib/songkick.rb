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

    def get(url, query = {})
      response = HTTParty.get(url, query: query)
      JSON.parse(response.body)
    end

    def location_id_query(location_query)
      url = location_search_url(location_query)
      response = get(url)
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

    # def event_search(query = {})
    #   url = "/events.json?apikey=#{ENV["SONGKICK_KEY"]}"
    #   response = get(url, query)
    #   pp response
    #   events = response["resultsPage"]["results"]["event"]
    #   extract_event_data(events)
    # end
end