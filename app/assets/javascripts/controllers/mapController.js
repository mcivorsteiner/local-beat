function MapController(view){
  this.view = view
  this.eventpresenter = new EventPresenter()
}

MapController.prototype = {
  init: function(){
    this.view.drawMap()
  },

  placeMarkers: function(event, eventData) {
    var markers = this.eventpresenter.createMarkers(eventData.events)
    this.view.placeMarkers(markers)
    this.view.setMap(eventData.location_coords)
  }
}



