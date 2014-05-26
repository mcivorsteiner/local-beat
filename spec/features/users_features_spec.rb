require 'spec_helper'

describe "Users", :js => true do
  context "sign up" do

    xit "allow user user to sign up" do
      visit root_path
      find('#user-session').click
      find('#sign-up').click
      fill_in "Email", :with => "mia@mia.com"
      fill_in "Password", :with => "mia"
      fill_in "City", :with => "San Francisco"
      fill_in "State", :with => "CA"
      find("#new_user input[type='submit']").click
      expect(page.body).to have_selector('#user-data')
    end
  end
end