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

    it "replies with response code 422 when api comes back with no location matches" do
      Songkick.stub(:location_id_query){ [] }
      get :search, event_search_params("sidj;en53")
      response.response_code.should == 422
    end

    it "replies with response code 422 when user error in date range" do
      Songkick.stub(:location_id_query){ [location] }
      get :search, { "user_input_location_name" => "San Francisco",
                     "artist_name" => "",
                     "min_date" => "2014-06-12",
                     "max_date" => "2014-06-11"
                   }
      response.response_code.should == 422
    end
  end

  context "search by sk location id" do
    it "is responds with success" do
      Songkick.stub(:event_search) {create_event_data}
      params = {songkickLocationID: 1409}
      get :search_by_sk_location_id, params
      expect(response).to be_success
    end

    it "responds with failure if id is no bueno" do
      Songkick.stub(:event_search) {[]}
      params = {songkickLocationID: 5287409}
      get :search_by_sk_location_id, params
      response.response_code.should == 422
    end

  end

  # context "format_date private helper method" do
  #   it "correctly formats select"
  # end

end