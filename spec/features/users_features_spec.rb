require 'spec_helper'

describe "Users", :js => true do
  let!(:user) { FactoryGirl.create :user }
  let!(:location) { FactoryGirl.create(:location) }

  context "sign up" do
    before(:each) do
      Songkick.stub(:location_id_query) { [location] }
      Songkick.stub(:event_search) { create_event_data }
      visit root_path
    end

    it "allow user user to sign up" do
      find('#login-menu-button').click
      find('#sign-up').click
      test_user_attributes = FactoryGirl.attributes_for :user
      fill_in "Email", :with => "mia@mia.com"
      fill_in "Password", :with => "mia"
      fill_in "City", :with => "San Francisco"
      fill_in "State", :with => "CA"
      find("#new_user input[type='submit']").click
      expect(page).to have_selector('#logout-button')
    end

    it "allows user to sign in" do
      find('#login-menu-button').click
      find('#login').click
      fill_in "Email", :with => user.email
      fill_in "Password", :with => user.password
      find("form input[type='submit']").click
      expect(page).to have_selector('#logout-button')
    end
  end
end