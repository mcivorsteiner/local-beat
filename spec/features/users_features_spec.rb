require 'spec_helper'

describe "Users", :js => true do
  context "sign up" do
    it "allow user user to sign up" do
      visit root_path
      find('#user-session').click
    end
  end
end