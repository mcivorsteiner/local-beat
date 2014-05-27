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
    var eventDetails = this.eventInfo
    if (eventDetails.isFestival()) {
      var html = HandlebarsTemplates['events/small_festival_info_box'](eventDetails)
    } else {
      var html = HandlebarsTemplates['events/small_event_info_box'](eventDetails)
    }
    infoWindow = new google.maps.InfoWindow()
    infoWindow.setContent(html)
    infoWindow.open(this.map, this)
  }
}

