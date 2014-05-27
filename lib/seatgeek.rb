require 'multi_json'
require 'pp'

module Seatgeek
  extend self

  def performer(id)
    query_url = "http://api.seatgeek.com/2/performers/#{id}"
    query_response = HTTParty.get(query_url).body
  end

  def performer_events(id)
    query_url = "http://api.seatgeek.com/2/events?performers.id=#{id}"
    query_response = HTTParty.get(query_url).body

  end

end