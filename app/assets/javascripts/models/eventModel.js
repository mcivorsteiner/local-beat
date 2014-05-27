function Event(eventData){
  this.constructor.count++
  this.skEventId = eventData.sk_event_id
  this.displayName = eventData.display_name
  this.date = this.dateFormatter(eventData.date)
  this.artists = eventData.artists
  this.latLng = eventData.location
  this.metroArea = eventData.metro_area
  this.state = eventData.state
  this.venueName = eventData.venue_name
  this.popularity = eventData.popularity
  this.eventType = eventData.event_type
  this.uri = eventData.uri
  this.headliner = eventData.headliner
  if (eventData.time) {
    this.time = this.timeFormatter(eventData.time)
  }
}

Event.prototype = {
  isFestival: function() {
    if (this.eventType === "Festival") {
      return true
    } else {
      return false
    }
  },

  timeFormatter: function(time) {
    var parts = time.split(':'),
        hour = parts[0],
        minutes = parts[1];
    if (hour > 12) {
        return time = (hour - 12) + ':' + minutes + ' PM';
    } else if (hour === 0) {
        return time = 12 + ':' + minutes + ' AM';
    } else if (hour == 12) {
        return time += ' PM';
    } else {
        return time += ' AM';
    }
  },

  dateFormatter: function(date) {
    var parts = date.split('-')
      year = parts[0],
      month = parts[1]-1,
      day = parts[2];

    var monthName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return monthName[month]+ " " + day + ", " + year
  }

}

