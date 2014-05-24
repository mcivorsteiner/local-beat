class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.integer :sk_location_id
      t.float :lat
      t.float :lng
      t.string :user_input_location_name
      t.string :sk_location_name
      t.string :state
      t.string :country
    end
  end
end
