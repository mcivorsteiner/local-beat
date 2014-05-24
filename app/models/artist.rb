class Artist < ActiveRecord::Base
  validates :sk_artist_id, presence: {message: "Unable to locate artist entered"}
end