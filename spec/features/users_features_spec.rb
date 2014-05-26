require 'spec_helper'

describe "Users", :js => true do
  let!(:user) {FactoryGirl.create :user}

  context "sign up" do
    before(:each) { visit root_path }

    it "allow user user to sign up" do
      find('#login-menu-button').click
      find('#sign-up').click
      fill_in "Email", :with => "mia@mia.com"
      fill_in "Password", :with => "mia"
      fill_in "City", :with => "San Francisco"
      fill_in "State", :with => "CA"
      find("#new_user input[type='submit']").click
      expect(page).to have_selector('#logout-button')
      # expect(page.body).to have_selector('#user-data')
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