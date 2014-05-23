class UsersController < ApplicationController
  def create
    @user = User.new(params[:user])
    @user.password = params[:password]
    user_input_location_name = "#{params[:city]}, #{params[:state]}"
    puts user_input_location_name
    if @location = Location.find_by_user_input_location_name(user_input_location_name)
      @user.location = @location
    else
      # location_query_results = SongKick.location_id_query(user_input_location_name)
      # top_location_match = location_query_results.first
      # @location = Location.new(user_input_location_name: user_input_location_name## Parse other location data from query)

      # set @user.location equal to SongKick Location ID
    end


    if @user && @user.save
      session[:user_id] = @user.id
      render partial: "shared/user_data", locals: {user: current_user, user_location_data: @user_location_data}
    else
      # Determine login failure action
      # render :new
    end

  end
end