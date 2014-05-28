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
      google.maps.event.addListener(markers[i], 'click', this.getLargeInfoBoxData)
    }
    this.view.setMap(eventData.location_coords)

  },

  showInfoWindow: function() {
    if (typeof infoWindow != "undefined") {
      infoWindow.close()
    }
    $('.large-info-box').remove()
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
    $('body').append(largeInfoBox)
  },

  showLargeInfoWindow: function() {
    if (typeof infoWindow != "undefined") {
      infoWindow.close()
    }
    $('.large-info-box').removeClass('hidden')
  },

  getLargeInfoBoxData: function(){
    eventObject = this.eventInfo
    var ajaxRequest = $.ajax({
      url: '/events/detailed_info',
      type: "GET",
      data: {sk_artist_id: eventObject.headlinerId, date: eventObject.date }
    })

    ajaxRequest.done(function(response){
      var artist_img = document.createElement('img')
      artist_img.src = response.artist_img
      artist_img.classList.add('artist-img')
      $('.large-info-box').append(artist_img)

      var href = "https://embed.spotify.com/?uri=spotify:track:" + response.top_song_ids[0]
      var source = { href: href }
      var html = HandlebarsTemplates['events/spotify_embed'](source)
      $('.large-info-box').append(html)
    })
  },

  closeLargeInfoWindow: function(e) {
    e.preventDefault();
    $('.large-info-box').remove()
  },

  createLargeInfoBox: function(eventObject, response){
    // var href = "https://embed.spotify.com/?uri=spotify:track:" + response.top_song_ids[0]
    // var source = { href: href }
    // var html = HandlebarsTemplates['events/spotify_embed'](source)
    // $('.container').append(html)
  }
}


