class AddSpotifyIdAndRefreshTokenToUsers < ActiveRecord::Migration
  def change
    add_column :users, :spotify_user_id, :integer
    add_column :users, :spotify_refresh_token, :string
  end
end
