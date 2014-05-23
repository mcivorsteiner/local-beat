class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.integer :music_brainz_id
      t.string :name
    end
  end
end
