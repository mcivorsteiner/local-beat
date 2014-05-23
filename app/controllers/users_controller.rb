class UsersController < ApplicationController
  def create
    @user = User.new(params[:user])
    @user.password = params[:password]
    if @location = Location.find_by_user_input_location_name(params[:location])
      @user.location = @location
    else
      # find location via SongKick API
      # display matches to user?
      # set @user.location equal to SongKick Location ID
    end


    if @user && @user.save
      session[:user_id] = @user.id
      ##Determine logged in action
    else
      # Determine login failure action
      # render :new
    end

  end
end