function MapController(mapView){
  this.view = mapView
  this.eventPresenter = new EventPresenter()
  this.markers = []
}

MapController.prototype = {
  init: function(){
    this.view.drawMap()
    $(document).on('click', '.more-info', this.showLargeInfoWindow.bind(this))
    $(document).on('click', '.close-infobox', this.closeLargeInfoWindow.bind(this))
    $(document).on('click', '#popularity-button', this.togglePopularityBox.bind(this))
    $(document).on('click', '.close-popularity-box', this.view.removePopularityBox.bind(this.view))
    if (typeof userData != 'undefined') {
      var locationCoords = {lat: userData.lat, lng: userData.lng}
      this.view.setMap(locationCoords)
    }
  },

  placeMarkers: function(event, eventData) {
    this.view.clearMarkers(this.markers)
    this.markers = this.eventPresenter.createMarkers(eventData.events)
    this.view.placeMarkers(this.markers)
    for(var i=0; i < this.markers.length; i++) {
      google.maps.event.addListener(this.markers[i], 'click', this.showInfoWindow)
      google.maps.event.addListener(this.markers[i], 'click', this.getLargeInfoBoxData)
    }
    this.view.setMap(eventData.location_coords)
  },


  // INFO WINDOWS

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

  togglePopularityBox: function() {
    if($('#popularity-box').is(':visible')) {
      this.view.removePopularityBox()
    } else {
      this.showPopularityBox()
    }
  },

  showPopularityBox: function() {
    this.sortMarkersByEventPopularity()

    var events = this.eventsArray(),
        html = HandlebarsTemplates['events/popularity'](events)

    $('body').append(html)
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
      //append photo
      if (response.artist_img){
        var artist_img = document.createElement('img')
        artist_img.src = response.artist_img
        artist_img.classList.add('artist-img')
        $('.large-info-box').append(artist_img)
      }

      //append ticket info
      var ticket_info = response.ticket_info
      if(ticket_info !== null && ticket_info.seatgeek_url !== null){
        var source = { seatgeek_url:    ticket_info.seatgeek_url,
                       average_price:   ticket_info.average_price,
                       lowest_price:    ticket_info.lowest_price,
                       listing_count:   ticket_info.listing_count
                     }
        var html = HandlebarsTemplates['events/ticket_info'](source)
        $('.seatgeek-link-div').append(html)
      }

      //append spotify player
      if ( response.top_song_ids.length > 0 ){
        var href = "https://embed.spotify.com/?uri=spotify:track:" + response.top_song_ids[0]
        var source = { href: href }
        var html = HandlebarsTemplates['events/spotify_embed'](source)
        $('.spotify-player').append(html)
      }

      //append artist bio
      if (response.artist_bio !== null) {
        var link = document.createElement('a')
        link.href = ''
        link.innerText = '  Artist Bio'
        $('.artist-bio-div').prepend(link)
        $('.artist-bio-div a').on('click', function(){
          event.preventDefault()
          $('.artist-bio').toggle('hidden')
        })
        var source = response.artist_bio
        $('.artist-bio').text(source)

      }
    })
  },

  closeLargeInfoWindow: function(e) {
    e.preventDefault();
    $('.large-info-box').remove()
  },

  sortMarkersByEventPopularity: function() {
    this.markers.sort(function(a, b) {
      var event1Popularity = a.eventInfo.popularity,
          event2Popularity = b.eventInfo.popularity
      if (event1Popularity > event2Popularity) {
        return -1
      } else if (event1Popularity < event2Popularity ) {
        return 1
      }
      return 0
    })
  },

  // for development purposes
  logEventPopularity: function() {
    for(var i=0; i<this.markers.length; i++) {
      var eventInfo = this.markers[i].eventInfo
      console.log(eventInfo.artists)
      console.log(eventInfo.date)
      console.log(eventInfo.popularity)
      console.log('--------------')
    }
  },

  eventsArray: function() {
    var events = [],
        eventLength = this.markers.length

    for(var i=0; i<eventLength; i++) {
      var eventObject = this.markers[i].eventInfo
      eventObject.ordinal = i+1
      events.push(eventObject)
    }

    return events
  }

}


