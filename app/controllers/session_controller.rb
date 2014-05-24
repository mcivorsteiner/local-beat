class SessionController < ApplicationController
  def new
  end

  def create
    @user = User.includes(:location).find_by_email(params[:email])

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render partial: "shared/user_data", locals: {user: @user}
    else
      render json: {error: "Invalid Email and/or password"},
      status: :unprocessable_entity
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to :root
  end
end