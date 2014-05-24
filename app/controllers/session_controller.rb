class SessionController < ApplicationController
  def new
  end

  def create
    @user = User.includes(:location).find_by_email(params[:email])

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id

      html = render_to_string partial: "shared/user_data", locals: {user: @user}
      render json: {userData: UserPresenter.create_json(@user), template: html}
    else
      render json: {errors: ["Invalid Email and/or password"]},
      status: :unprocessable_entity
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to :root
  end
end