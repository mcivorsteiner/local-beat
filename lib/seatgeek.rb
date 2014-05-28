require 'multi_json'
require 'echonest'

module Seatgeek
  extend self

  def find_event_with_songkick_artist_id_and_date(songkick_artist_id, event_date)
    seatgeek_artist_id = Echonest.get_seatgeek_id(songkick_artist_id)

    unless seatgeek_artist_id == nil
      event = performer_event_on_date(seatgeek_artist_id, event_date)
    else
      return nil
    end

    unless event == nil
      seatgeek_url = event["url"]
      ticket_details = event["stats"]
      listing_count = ticket_details["listing_count"]
      average_price = format_price(ticket_details["average_price"])
      lowest_price = format_price(ticket_details["lowest_price"])
      highest_price = format_price(ticket_details["highest_price"])
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

  def performer_event_on_date(artist_id, event_date)
    date = Date.parse(event_date).strftime('%Y-%m-%d')
    query_url = "http://api.seatgeek.com/2/events?performers.id=#{artist_id}&datetime_utc=#{date}"
    query_response = HTTParty.get(query_url).body

    formatted_query_response = JSON.parse(query_response)

    unless formatted_query_response["status"] == "error" || formatted_query_response["status"] == 400
      return formatted_query_response["events"].first
    else
      nil
    end
  end

  def format_price(price)
    "%.2f" % [price]
  end
end