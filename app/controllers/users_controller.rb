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
      render json: UserPresenter.create_json(@user)
    else
      # Determine login failure action
      # render :new
    end

  end
end