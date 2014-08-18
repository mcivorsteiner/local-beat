class SpotifyClient
  include HTTParty
  base_uri 'https://api.spotify.com'

  attr_accessor :access_token

  def initialize(args = {})
    @access_token = args[:access_token]
  end

  def request(path, options = {})
    response = self.class.get(path, options)
    JSON.parse(response.body)
  end

  def get_profile_data
    request('/v1/me', headers: { "Authorization" => "Bearer #{@access_token}" })
  end
end