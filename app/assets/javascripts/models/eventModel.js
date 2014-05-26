/* YIKES NO NO NO NO NO NO!
 *
 * Event is a native JavaScript class -- you're breaking core JS
 * functionality!  I'm astounded everything still works!
 *
 */

function Event(eventData){
  this.constructor.count++

  // Consider for() for enumerating hasOwnProperty keys
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
  this.headliner = eventData.headliner
}

Event.prototype = {
  isFestival: function() {
    // simpler:
    //
    return (this.eventType === "Festival");
    //if (this.eventType === "Festival") {
      //return true
    //} else {
      //return false
    //}
  }
}
