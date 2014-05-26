class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.integer :sk_artist_id
      t.string :name # Sweet, I'll be sure to create a user with NULL as name :(
    end
  end
end
