require 'spec_helper'

describe "Homepage", :js => true do
  context "buttons" do
    before(:each) { visit root_path }

    it "should not display sign up/login/search/adv-search buttons onload" do
      expect(page).to_not have_content("Sign Up")
      expect(page).to_not have_content("Login")
      expect(page).to_not have_content("Search")
      expect(page).to_not have_content("Search")
    end

    it "should display sign up and sign in buttons after click" do
      find('#login-menu-button').click
      expect(page).to have_content("Sign Up")
      expect(page).to have_content("Login")
    end

    it "should display search and more options buttons after click" do
      find('#magnify').click
      expect(page).to have_selector(".location-search")
      expect(page).to have_selector("#advanced-search")
    end

    it "should display more input options after click" do
      find('#magnify').click
      find('#advanced-search').click
      expect(page).to have_content("Artist name")
      expect(page).to have_content("Min date")
    end
  end
end