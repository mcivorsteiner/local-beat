function MapController(view){
  this.view = view
  this.eventpresenter = new EventPresenter()
}

MapController.prototype = {
  init: function(){
    this.view.drawMap()
  },

//set a listener for this after a search is completed
  placeMarkers: function(event, eventData) {
    var markers = this.eventpresenter.createMarkers(eventData.events)
    console.log(markers)
    this.view.placeMarkers(markers)
  }
}



