class SessionController < ApplicationController
  def new
  end

  def create
    # @user = User.find_by_email(params[:email])
    @user = User.includes(:location).find_by_email(params[:email])

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      # render json: UserPresenter.create_json(@user)
      render partial: "shared/user_data", locals: {user: @user}
    else
      render json: {error: "Bad Email and/or password"},
      status: :unprocessable_entity
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to :root
  end
end