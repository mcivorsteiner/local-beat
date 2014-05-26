function MapController(view){
  this.view = view
  this.eventPresenter = new EventPresenter()
  this.markers = []
}

MapController.prototype = {
  init: function(){
    this.view.drawMap()

    /* Hm, is this a global?  :-/
     *
     *
     * I'd also collapse down some of this logic
     *
     * Wait...
     * Isn't not undefined === truthy?  make simlpler;
     *
     * Ah, so if you simply do a truthiness test you get a red error message in
     * Chrome.  Maybe this should only fire once we *DO*
     * have userData.....this wrangling
     * is the code telling you that you're somewhat off in your design.
    */
    if (typeof userData != 'undefined') this.view.setMap({lat: userData.lat, lng: userData.lng})
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
    /* Really dislike your use of globals: couldn't you wrap it, or set it on
    *  something?
    */
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



