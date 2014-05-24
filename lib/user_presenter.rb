module UserPresenter
  extend self
  def create_json(user_object)
    user_location = user_object.location
    user_data = {
      id: user_object.id,
      email: user_object.email,
      lat: user_location.lat,
      lng: user_location.lng,
      songkickLocationName: user_location.sk_location_name
    }.to_json
  end
end