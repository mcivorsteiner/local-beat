require 'spec_helper'

describe LocationsController do
  let!(:location) {FactoryGirl.create(:location)}
  Location.destroy_all

  context 'search' do

    it "responds to GET request to search action" do
      Songkick.stub(:location_coords_query){ {lat: Faker::Address.latitude, lng: Faker::Address.longitude} }

      Songkick.stub(:event_search_by_lat_lng){{metro_area_id: "1409", events: ["Event"]}}

      location = FactoryGirl.create(:location, :sk_location_id => "1409")

      get :search
      expect(response).to be_success
    end
  end
end