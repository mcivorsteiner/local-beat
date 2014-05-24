class ApplicationController < ActionController::Base
  protect_from_forgery
  require 'user_presenter'
  require 'songkick'

  def current_user
    if session[:user_id]
      @user = User.find(session[:user_id])
    end
  end

  def logged_in?
    !!current_user
  end
end
