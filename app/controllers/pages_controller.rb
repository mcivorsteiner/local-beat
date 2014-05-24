class PagesController < ApplicationController
  def index
    @user = User.new
    if logged_in?
      @user_location_data = current_user.location
    end
  end
end