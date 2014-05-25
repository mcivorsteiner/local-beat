module TestHelpers
  # extend self

  def event_search_params(location_name = nil, options = {})
    location = location_name || "San Fransisco"
    artist_name = options[:artist_name] || ""
    if options[:dates]
      min_date = {"(1i)"=>"2014", "(2i)"=>"6", "(3i)"=>"1"}
      max_date = {"(1i)"=>"2014", "(2i)"=>"6", "(3i)"=>"30"}
    else
      min_date = ""
      max_date = ""
    end
    return { "user_input_location_name" => location,
             "artist_name" => artist_name,
             "min_date" => min_date,
             "max_date" => max_date
           }
  end

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