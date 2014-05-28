require 'spec_helper'

module TestHelpers
  # extend self
  def stub_current_user
    ApplicationController.any_instance.stub(:current_user) { FactoryGirl.create :user }
  end
end

describe UsersController do
  User.destroy_all
  let!(:user) { FactoryGirl.create :user }
  # let!(:location) {FactoryGirl.create :location}

  context "sign-up" do
    it "responds with success when passed valid attributes" do
      Songkick.stub(:location_id_query) { [FactoryGirl.create(:location)] }
      params = {user: {email: "notreal@fake.com" },
                password: "password"}
      post :create, params
      expect(response).to be_success
    end

    it "has unsuccessful response when passed invalid email" do
      Songkick.stub(:location_id_query) { [FactoryGirl.create(:location)] }
      params = {user: {email: "invalid@nope.x" },
                password: "password"}

      post :create, params
      expect(response).to_not be_success
    end

    it "has unsuccessful response when password not present" do
      Songkick.stub(:location_id_query) { [FactoryGirl.create(:location)] }
      params = {user: {email: "notreal@fake.com" },
                password: ""}

      post :create, params
      expect(response).to_not be_success
    end
  end

  context "update preferences" do
    it "responds with success when passed valid attributes" do
      Songkick.stub(:location_id_query) { [FactoryGirl.create(:location)] }
      Songkick.stub(:event_search) { create_event_data }

      stub_current_user

      params = {location: "washingtion dc"}

      put :update, params
      expect(response).to be_success
    end
  end
end