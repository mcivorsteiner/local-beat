FactoryGirl.define do
  factory :location do
    user_input_location_name { Faker::Name.name }
    sk_location_name { Faker::Name.name }
    sk_location_id { Faker::Number.digit }
  end  

  factory :artist do
    sk_artist_id { Faker::Number.digit }
    name { Faker::Name.name }
  end
end

