function MapController(view){
  this.view = view
  this.eventPresenter = new EventPresenter()
  this.markers = []
}

MapController.prototype = {
  init: function(){
    this.view.drawMap()
    if (typeof userData != 'undefined') {
      var locationCoords = {lat: userData.lat, lng: userData.lng}
      this.view.setMap(locationCoords)
    }
     $(document).on('click', '.more-info', this.showLargeInfoWindow.bind(this))
     $(document).on('click', '.close-infobox', this.closeLargeInfoWindow.bind(this))
  },

  placeMarkers: function(event, eventData) {
    this.view.clearMarkers(this.markers)
    this.view.hideSearchBox() //WIP this should be calling search view method
    
    this.markers = this.eventPresenter.createMarkers(eventData.events)
    this.view.placeMarkers(this.markers)
    for(var i=0; i < markers.length; i++) {
      google.maps.event.addListener(markers[i], 'click', this.showInfoWindow)
    }
    this.view.setMap(eventData.location_coords)

  },

  showInfoWindow: function() {
    if (typeof infoWindow != "undefined") {
      infoWindow.close()
    }
    this.closeLargeInfoWindow()
    var eventDetails = this.eventInfo
    if (eventDetails.isFestival()) {
      var html = HandlebarsTemplates['events/small_festival_info_box'](eventDetails)
      var largeInfoBox = HandlebarsTemplates['events/large_festival_info_box'](eventDetails)
    } else {
      var html = HandlebarsTemplates['events/small_event_info_box'](eventDetails)
      var largeInfoBox = HandlebarsTemplates['events/large_event_info_box'](eventDetails)
    }
    infoWindow = new google.maps.InfoWindow()
    infoWindow.setContent(html)
    infoWindow.open(this.map, this)
    $("body").append(largeInfoBox)
    this.view.appendLargeInfoBox(largeInfoBox)
    this.getLargeInfoBoxData()
  },

  showLargeInfoWindow: function() {
    if (typeof infoWindow != "undefined") {
      infoWindow.close()
    }
    $('.large-info-box').removeClass('hidden')
  },

  closeLargeInfoWindow: function() {
    $('.large-info-box').remove()
  },

  getLargeInfoBoxData: function(){
    this.getSpotifySongs()
  },

  getSpotifySongs: function(){
    event.preventDefault()
    var ajaxRequest = $.ajax({
      url: event.target.href,
      type: "GET",
      data: {sk_artist_id: $(event.target).data("sk-id")}
    })

    ajaxRequest.done(this.showSongs.bind(this))
  },

  showSongs: function(response){
    var href = "https://embed.spotify.com/?uri=spotify:track:" + response.top_song_ids[0]
    var source = { href: href }
    var html = HandlebarsTemplates['events/spotify_embed'](source)
    $('.container').append(html)
  }
}


