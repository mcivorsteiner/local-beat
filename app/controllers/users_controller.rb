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
end