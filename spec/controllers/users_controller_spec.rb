require 'spec_helper'

describe UsersController do
  User.destroy_all
  let!(:user) { FactoryGirl.create :user }

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
end