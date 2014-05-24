class SessionController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_email(params[:email])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render json: UserPresenter.create_json(@user)
    else
      #bad login action
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to :root
  end
end