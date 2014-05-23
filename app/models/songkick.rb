require 'dotenv'
Dotenv.load
require 'httparty'
require 'pp'
module SongKick
  class Client

    def location_search_url(location_name)
      query = location_name.gsub(/\s/, "+")
      return "http://api.songkick.com/api/3.0/search/locations.json?query=#{query}&apikey=#{ENV["SONGKICK_KEY"]}"
    end

    def get(url, query = {})
      response = HTTParty.get(url, query: query)
      JSON.parse(response.body)
    end

    # def location_id_query(location_query)
    #   url = location_search_url(location_query)
    #   response = get(url)
    #   locations = response["resultsPage"]["results"]["location"].map do |location|
    #     display_name = location["metroArea"]["displayName"] rescue nil
    #     sk_location_id = location["metroArea"]["id"].to_i rescue nil
    #     lat = location["metroArea"]["lat"].to_f rescue nil
    #     lng = location["metroArea"]["lng"].to_f rescue nil
    #     Location.new(display_name: display_name, sk_location_id: sk_location_id, user_input_location_name: location_query.downcase)
    #   end
    #   locations
    # end

    def event_search(query = {})
      url = "http://api.songkick.com/api/3.0/events.json?apikey=#{ENV["SONGKICK_KEY"]}"
      response = get(url, query)
      pp response
      events = response["resultsPage"]["results"]["event"]
      extract_event_data(events)
    end
  end
end

test = SongKick::Client.new
puts test.location_search_url("Minneapolis")
# pp test.location_id_query("Minneapolis")
pp test.event_search({artist_name: "Lady Gaga", min_date: "2014-05-30", max_date: "2014-07-16"})
