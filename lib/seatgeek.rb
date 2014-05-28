require 'multi_json'
require 'pp'

module Seatgeek
  extend self

  # def performer(id)
  #   query_url = "http://api.seatgeek.com/2/performers/#{id}"
  #   query_response = HTTParty.get(query_url).body
  # end

  # def performer_events(id)
  #   query_url = "http://api.seatgeek.com/2/events?performers.id=#{id}"
  #   query_response = HTTParty.get(query_url).body

  # end

  def performer_event_on_date(artist_id, event_date)
    date = Date.parse(event_date).strftime('%Y-%m-%d')
    query_url = "http://api.seatgeek.com/2/events?performers.id=#{artist_id}&datetime_utc=#{date}"
    query_response = HTTParty.get(query_url).body

    formatted_query_response = JSON.parse(query_response)

    pp formatted_query_response
    unless formatted_query_response["status"] == "error" || formatted_query_response["status"] == 400
      return formatted_query_response["events"].first
    else
      nil
    end

  end

  def find_event_with_songkick_artist_id_and_date(songkick_artist_id, event_date)
    seatgeek_artist_id = Echonest.get_seatgeek_id(songkick_artist_id)

    p seatgeek_artist_id
    unless seatgeek_artist_id == nil
      event = performer_event_on_date(seatgeek_artist_id, event_date)
    else
      return nil
    end

    pp event

    unless event == nil
      seatgeek_url = event["url"]
      ticket_details = event["stats"]
      listing_count = ticket_details["listing_count"]
      average_price = ticket_details["average_price"]
      lowest_price = ticket_details["lowest_price"]
      highest_price = ticket_details["highest_price"]
      performers = event["performers"]
      headliner = performers.first
      return seatgeek_info = { seatgeek_url: seatgeek_url,
                      listing_count: listing_count,
                      average_price: average_price,
                      lowest_price: lowest_price,
                      highest_price: highest_price,
                      headliner_image_urls: headliner["images"]
      }
    else
      return nil
    end
  end

  private

  def validate_seatgeek_artist_id_found(sg_artist_id)
    unless sg_artist_id == nil
    end
  end

end