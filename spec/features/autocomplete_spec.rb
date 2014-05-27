# require 'spec_helper'

# describe "Artist Search", :js => true do

#   context "search text field" do
#     before(:each) { visit root_path }
#     it "should autocomplete as user types in artist search text field" do
#       find('#magnify').click
#       fill_in "Location", :with => "Los Angeles"
#       find('#more-options-icon').click
#       fill_in "Artist Name", :with => "billy "
#       sleep(5)

#       page.should have_selector('ul.ui-autocomplete li.ui-menu-item')
#     end
#   end
# end