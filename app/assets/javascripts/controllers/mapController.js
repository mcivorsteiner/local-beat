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
    $(document).on('click', this.getSpotifyPlayer.bind(this))
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

    if (typeof infoBox == "object") {
      infoBox.close()
    }
    // var infoBox = null
    var boxOptions = { disableAutoPan:          false,
                       maxWidth:                0,
                       pixelOffset:             new google.maps.Size(-140, 0),
                       zIndex:                  null,
                       boxStyle:                { opacity: 0.75 },
                       closeBoxMargin:          "10px 2px 2px 2px",
                       closeBoxURL:             "http://www.google.com/intl/en_us/mapfiles/close.gif",
                       infoBoxClearance:        new google.maps.Size(1, 1),
                       isHidden:                false,
                       pane:                     "floatPane",
                       alignBottom:             true,
                       enableEventPropagation:  true
                      };

    infoBox = new InfoBox(boxOptions);
    var eventDetails = this.eventInfo
    if (eventDetails.isFestival()) {
      var html = HandlebarsTemplates['events/small_festival_info_box'](eventDetails)
    } else {
      var html = HandlebarsTemplates['events/small_event_info_box'](eventDetails)
    }
    // infoWindow = new google.maps.InfoWindow()
    // infoWindow.setContent(html)
    // infoWindow.open(this.map, this)
    infoBox.setContent(html);
    infoBox.open(this.map, this);
  },

  getSpotifyPlayer: function(){
    event.preventDefault()
    // debugger
    var ajaxRequest = $.ajax({
      url: event.target.href,
      type: "GET",
      data: {sk_artist_id: $(event.target).data("sk-id")}
    })

    ajaxRequest.done(this.showSongs.bind(this))
  },

  showSongs: function(response){
    // debugger
    var href = "https://embed.spotify.com/?uri=spotify:track:" + response.top_song_ids[0]
    var source = { href: href }
    var html = HandlebarsTemplates['events/spotify_embed'](source)
    $('.container').append(html)
  }


}


