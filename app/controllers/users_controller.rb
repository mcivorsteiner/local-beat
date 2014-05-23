class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    @user.password = params[:password]
    if @user && @user.save
      session[:user_id] = @user.id
      ##Determine logged in action
    else
      # Determine login failure action
      # render :new
    end
  end
end