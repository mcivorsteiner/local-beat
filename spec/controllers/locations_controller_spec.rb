require 'spec_helper'

describe LocationsController do

  context 'search' do
    it "responds to GET request to search action" do
      Songkick.stub(:location_coords_query){ {lat: Faker::Address.latitude, lng: Faker::Address.longitude} }

      Songkick.stub(:event_search_by_lat_lng){{metro_area_id: "1409", events: ["Event"]}}

      get :search
      expect(response).to be_success
    end
  end
end