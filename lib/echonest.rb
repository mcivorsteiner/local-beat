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
end