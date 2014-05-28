require 'multi_json'
require 'pp'

module Echonest
  extend self
  # include HTTParty
  # base_uri 'http://api.songkick.com/api/3.0'
  ECHONEST_KEY = ENV['ECHONEST_KEY']
  NUMBER_OF_RESULTS = 3

  def get_track_json(songkick_artist_id)
    query_url = "http://developer.echonest.com/api/v4/playlist/static?api_key=#{ECHONEST_KEY}&artist_id=songkick:artist:#{songkick_artist_id}&sort=song_hotttnesss-desc&results=#{NUMBER_OF_RESULTS}&type=artist&bucket=tracks&bucket=id:spotify-WW&limit=true"

    query_response = HTTParty.get(query_url).body

    return MultiJson.load(query_response)
  end

  def get_artist_bio(songkick_artist_id)
    query_url= "http://developer.echonest.com/api/v4/artist/biographies?api_key=#{ECHONEST_KEY}&id=songkick:artist:#{songkick_artist_id}&format=json&results=1&start=0&license=cc-by-sa"

    query_response = JSON.parse(HTTParty.get(query_url).body)
    bio = query_response["response"]["biographies"]
    if bio && bio[0]
      return bio[0]["text"]
    else
      nil
    end

  end

  def get_artist_image(songkick_artist_id)
    query_url = "http://developer.echonest.com/api/v4/artist/images?api_key=#{ECHONEST_KEY}&id=songkick:artist:#{songkick_artist_id}&format=json&results=1&start=0&license=unknown"

    query_response = HTTParty.get(query_url)
    artist_img = query_response["response"]["images"]
    if artist_img && artist_img[0]
      return artist_img[0]["url"]
    else
      nil
    end
  end

  def get_tracks_list(songkick_artist_id)
    tracks = Array.new
    json = get_track_json(songkick_artist_id)
    pp json
    if results = json["response"]["songs"]
      tracks = results.map do |track|
        spotify_id = track["tracks"].first["foreign_id"]
        spotify_id.gsub(/spotify\-WW:track:/, "")
      end
    else
      tracks = []
    end

    return tracks
  end

  def get_seatgeek_id(songkick_artist_id)
    query_url = "http://developer.echonest.com/api/v4/artist/profile?api_key=#{ECHONEST_KEY}&id=songkick:artist:#{songkick_artist_id}&format=json&bucket=id:seatgeek"
    query_response = HTTParty.get(query_url).body
    formatted_response = JSON.parse(query_response)
    unless formatted_response["response"]["status"]["code"] == 5
      if formatted_response["response"]["artist"] && formatted_response["response"]["artist"]["foreign_ids"]
        seatgeek_key = formatted_response["response"]["artist"]["foreign_ids"].first["foreign_id"]
      end
      seatgeek_id = seatgeek_key[/(?<=seatgeek:artist:).+/] if seatgeek_key
    else
      nil
    end
  end
end