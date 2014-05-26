require 'spec_helper'

describe "Homepage", :js => true do
  context "buttons" do
    before(:each) { visit root_path }

    it "should not display sign up/login/search/adv-search buttons onload" do
      expect(page).to_not have_content("Sign Up")
      expect(page).to_not have_content("Sign In")
      expect(page).to_not have_content("Search")
      expect(page).to_not have_content("Search")
    end

    it "should display sign up and sign in buttons after click" do
      find('#log-in-menu-button').click
      expect(page).to have_content("Sign Up")
      expect(page).to have_content("Sign In")
    end

    it "should display search and more options buttons after click" do
      find('#magnify').click
      expect(page).to have_content("Search")
      expect(page).to have_content("More Search Options")
    end

    it "should display more input options after click" do
      find('#magnify').click
      find('#advanced-search').click
      expect(page).to have_content("Artist name")
      expect(page).to have_content("Min date")
    end

    # it "allow user user to sign up" do
    #   visit root_path
    #   fill_in "Email", :with => "mia@mia.com"
    # end
  end
end