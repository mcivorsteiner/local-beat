class UsersController < ApplicationController
  def create
    @user = User.new(params[:user])
    @user.password = params[:password]
    user_input_location_name = "#{params[:city]}, #{params[:state]}"
    if @location = Location.find_by_user_input_location_name(user_input_location_name)
      @user.location = @location
    else
      location_query_results = Songkick.location_id_query(user_input_location_name)
      top_location_match = location_query_results.first
      @location = Location.new(user_input_location_name: user_input_location_name,
                               sk_location_name: top_location_match[:location_name],
                               state: top_location_match[:state],
                               country: top_location_match[:country],
                               sk_location_id: top_location_match[:sk_location_id],
                               lat: top_location_match[:lat],
                               lng: top_location_match[:lng])

      @user.location = @location

    end


    if @user && @user.save
      session[:user_id] = @user.id
      render json: UserPresenter.create_json(@user)
    else
      # Determine login failure action
      # render :new
    end

  end
end