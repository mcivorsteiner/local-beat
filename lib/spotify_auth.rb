class SpotifyAuth
  include HTTParty
  base_uri 'https://accounts.spotify.com'

  def initialize
    @client_id = ENV['SPOTIFY_CLIENT_ID']
    @client_secret = ENV['SPOTIFY_CLIENT_SECRET']
    @redirect_uri = "http://localhost:3000/users/spotify/callback/"
    @scope = "user-read-private user-read-email user-library-read playlist-read-private"
  end

  def spotify_auth_url(state)
    query_hash = {
      response_type: 'code',
      client_id: @client_id,
      scope: @scope,
      redirect_uri: @redirect_uri,
      state: state
    }

    'https://accounts.spotify.com/authorize?' + query_hash.to_query
  end

end