require 'spec_helper'

describe EventsController do
  let!(:location) { FactoryGirl.create :location }
  let!(:artist) { FactoryGirl.create :artist }

  context "search" do
    it "reponds to GET request to search action" do
      Songkick.stub(:location_id_query) { [location] } 
      Songkick.stub(:event_search) { create_event_data }
      get :search, event_search_params
      expect(response).to be_success
    end

    it "creates a location if it is not found in the database" do
      Songkick.stub(:location_id_query) { [FactoryGirl.create(:location)] }
      Songkick.stub(:event_search) { create_event_data }
      expect{ 
        get :search, event_search_params
      }.to change { Location.count }.by(1)
    end

    it "does not create a new location if it is already in the database" do
      Songkick.stub(:event_search) {create_event_data}
      expect{
        get :search, event_search_params(location.user_input_location_name)
      }.to change { Location.count }.by(0)
    end
  end

  # context "format_date private helper method" do
  #   it "correctly formats select"
  # end

end