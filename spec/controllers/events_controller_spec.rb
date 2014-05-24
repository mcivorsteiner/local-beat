require 'spec_helper'

describe EventsController do
  let!(:location) { FactoryGirl.create :location }
  let!(:artist) { FactoryGirl.create :artist }

  context "search" do
    it "reponds to GET request to search action" do
      Songkick.stub(:location_id_query) { [location] } 
      Songkick.stub(:event_search) { create_event_data }
      get :search
      expect(response).to be_success
    end
  end

end