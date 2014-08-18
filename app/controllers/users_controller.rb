class UsersController < ApplicationController
  def create
    @user = User.new(params[:user])
    @user.password = params[:password]
    user_input_location_name = "#{params[:city]}, #{params[:state]}".downcase
    if @location = Location.find_by_user_input_location_name(user_input_location_name)
      @user.location = @location
    else
      location_query_results = Songkick.location_id_query(user_input_location_name)
      @location = location_query_results.first
      @user.location = @location
    end

    if @user && @user.save
      session[:user_id] = @user.id
      html = render_to_string partial: "shared/user_data", locals: {user: @user}
      sk_location_id = @location.sk_location_id
      events = Songkick.event_search({location: "sk:#{sk_location_id}"})

      render json: {userData: UserPresenter.create_json(@user), template: html, events: events}
    else
      render json: {errors: @user.errors.full_messages},
      status: :unprocessable_entity
    end
  end

  def update
    @location = Location.find_by_user_input_location_name(params[:location])
    @user = current_user

    if @location
      @user.location = @location
    else
      location_query_results = Songkick.location_id_query(params[:location])
      @location = location_query_results.first
      @user.location = @location
    end

    if @user && @user.save
      html = render_to_string partial: "shared/user_data", locals: {user: @user}
      sk_location_id = @location.sk_location_id
      events = Songkick.event_search({location: "sk:#{sk_location_id}"})
      render json: {userData: UserPresenter.create_json(@user), template: html, events: events}

    else
      render json: {errors: @user.errors.full_messages},
      status: :unprocessable_entity
    end
  end

  def spotify
    auth_client = SpotifyAuth.new
    state = SecureRandom.urlsafe_base64
    session[:spotify_auth_state] = state
    redirect_to auth_client.spotify_auth_url(state)
  end

  def callback
    @user = current_user
    auth_client = SpotifyAuth.new

    if params[:state] == session[:spotify_auth_state]
      session[:spotify_auth_state] = nil
      response = auth_client.request_tokens(params[:code])

      if response.code.to_i == 200
        token_data = JSON.parse(response.body)
        spotify_client = SpotifyClient.new(access_token: token_data["access_token"])
        profile_data = spotify_client.get_profile_data
        @user.update_attributes(spotify_user_id: profile_data["id"], spotify_refresh_token: token_data["refresh_token"])
        session[:access_token] = token_data["access_token"]
        redirect_to root_path
      end

    else
      redirect_to root_path
    end
  end
end