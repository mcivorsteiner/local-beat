function Event(eventData){
  this.constructor.count++
  this.skEventId = eventData.sk_event_id
  this.displayName = eventData.display_name
  this.date = eventData.date
  this.artists = eventData.artists
  this.latLng = eventData.location
  this.metroArea = eventData.metro_area
  this.state = eventData.state
  this.venueName = eventData.venue_name
  this.popularity = eventData.popularity
  this.eventType = eventData.event_type
  this.uri = eventData.uri
}

Event.prototype = {
  setInfoWindowListener: function(){

  }
}