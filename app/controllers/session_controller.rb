class SessionController < ApplicationController

  def create
    @user = User.includes(:location).find_by_email(params[:email])

    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      html = render_to_string partial: "shared/user_data", locals: {user: @user}

      sk_location_id = @user.location.sk_location_id

      events = Songkick.event_search({location: "sk:#{sk_location_id}"})

      render json: {userData: UserPresenter.create_json(@user), template: html, events: events}
    else
      render json: {errors: ["Invalid Email and/or password"]},
      status: :unprocessable_entity
    end
  end

  def destroy
    session.clear
    render text: "Session Cleared"
  end
end