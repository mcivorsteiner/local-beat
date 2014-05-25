function MapController(view){
  this.view = view
  this.eventPresenter = new EventPresenter()
}

MapController.prototype = {
  init: function(){
    this.view.drawMap()
  },

  placeMarkers: function(event, eventData) {
    this.view.hideSearchBox()
    var markers = this.eventPresenter.createMarkers(eventData.events)
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
    // var source = document.querySelector('div .small-info-box').html()
    // var template = Handlebars.compile(source)
    // infoWindow.setContent($(".small-info-box-container").html(template(eventDetails)) )
    eventContent = (document.querySelector(".small-info-box-container").textContent = eventDetails.venueName)
    infoWindow.setContent(eventContent)

    infoWindow.open(this.map, this)
  }
}



