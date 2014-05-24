module TestHelpers
  # extend self
  def create_event_data
    events_data = []
    5.times do
      events_data << { sk_event_id: Faker::Number.digit, 
                   display_name: "Outside Lands", 
                   date: "2014-08-14", 
                   artists: ["Paul McCartney"], 
                   headliner: "Paul McCartney", 
                   metro_area: "SF Bay Area", 
                   state: "CA", 
                   venue_name: "Golden Gate Park", 
                   popularity: 0.99, 
                   location: "Park", 
                   event_type: "Festival", 
                   uri: "site" 
                 }
    end
    return events_data
  end
  # def log_in_user(user)
  #   visit root_path
  #   fill_in 'session_email', with: user.email
  #   fill_in 'session_password', with: user.password
  #   click_button 'Login'
  # end

  # def stub_current_user(user)
  #   ApplicationController.any_instance.stub(:current_user) {user}
  # end

  # def build_attributes(*args)
  #   FactoryGirl.build(*args).attributes.delete_if do |k, v| 
  #     ["id", "created_at", "updated_at"].member?(k)
  #   end
  # end

end