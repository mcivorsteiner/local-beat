function MapController(view){
  this.view = view
  this.eventPresenter = new EventPresenter()
  this.markers = []
}

MapController.prototype = {
  init: function(){
    this.view.drawMap()
  },

  placeMarkers: function(event, eventData) {
    this.view.clearMarkers(this.markers)
    this.view.hideSearchBox()
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
    if (eventDetails.isFestival) {

    }
    infoWindow = new google.maps.InfoWindow()
    // var source = document.querySelector('.small-info-box').innerHTML
    // var template = Handlebars.compile(source)
    // var context = {eventObject: eventDetails }


    // var html = template(context)
    var html = HandlebarsTemplates['events/small_event_info_box'](eventDetails)

    debugger

    infoWindow.setContent(html)
    infoWindow.open(this.map, this)
  }
}



