class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :songkick_location_id
      t.float :latitude
      t.float :longitude
      t.text :user_input_location_name
      t.text :songkick_location_name
    end
  end
end
