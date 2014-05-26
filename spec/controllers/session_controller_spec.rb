require 'spec_helper'

describe SessionController do
  let!(:user) { FactoryGirl.create :user }

  context "create(login)" do
    it "assigns @user to correct user" do
      post :create, { :email => user.email, :password => user.password }
      expect(assigns(:user)).to eq(user)
    end

    it "creates a new session with correct credentials" do
      post :create, { :email => user.email, :password => user.password }
      expect(session[:user_id]).to eq(user.id)
    end

    it "doesn't create a new session with invalid credentials" do
      session[:user_id] = nil
      post :create, { email: user.email, password: "#{user.password}x"}
      expect(session[:user_id]).to eq(nil)
    end
  end

  context "destroy(logout)" do
    it "responds with success" do
      delete :destroy
      expect(response).to be_success
    end

    it "responds with Session Cleared" do
      delete :destroy
      expect(response.body).to eq("Session Cleared")
    end
  end
end