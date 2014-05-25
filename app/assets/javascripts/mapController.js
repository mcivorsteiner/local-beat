function MapController(view){
  this.view = view
  this.eventPresenter = new EventPresenter()
}

MapController.prototype = {
  init: function(){
    this.view.drawMap()
  },

  placeMarkers: function(event, eventData) {
    var markers = this.eventPresenter.createMarkers(eventData.events)
    console.log(markers)
    this.view.placeMarkers(markers)

    for(var i=0; i < markers.length; i++) {
      google.maps.event.addListener(markers[i], 'click', this.showInfoWindow)
    }
  },

  showInfoWindow: function() {

    if (typeof infoWindow != "undefined") {
      infoWindow.close()
    }
    var eventDetails = this.eventInfo
    infoWindow = new google.maps.InfoWindow()
    infoWindow.setContent("yoyo")

    infoWindow.open(this.map, this)
  }
}



