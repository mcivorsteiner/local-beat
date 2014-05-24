require 'spec_helper'

describe EventsController do
  # let!(:location) { FactoryGirl.create :location }
  # let!(:artist) { FactoryGirl.create :artist }

  context "search" do
    it "reponds to GET request to search action" do
      Songkick.stub(:location_id_query) { [Location.new(sk_location_id: 3455)] } 
      Songkick.stub(:event_search) { [{ sk_event_id: 1, display_name: "Outside Lands", date: "2014-08-14", artists: ["Paul McCartney"], headliner: "Paul McCartney", metro_area: "SF Bay Area", state: "CA", venue_name: "Golden Gate Park", popularity: 0.99, location: "Park", event_type: "Festival", uri: "site" }] }
      get :search
      expect(response).to be_success
    end
  end

end