class Artist < ActiveRecord::Base
  attr_accessible :name, :sk_artist_id
  validates :sk_artist_id, presence: {message: "Unable to locate artist entered"}
end