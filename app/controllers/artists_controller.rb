class ArtistsController < ApplicationController
  def top_songs
    top_song_ids = Echonest.get_tracks_list(params[:sk_artist_id])
    render json: { top_song_ids: top_song_ids }
  end
end