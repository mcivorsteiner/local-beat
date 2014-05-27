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
     $(document).on('click', '.more-info', this.enlargeInfoWindow.bind(this))
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
    var boxOptions = { disableAutoPan: false
    ,maxWidth: 0
    ,pixelOffset: new google.maps.Size(-140, 0)
    ,zIndex: null
    ,boxStyle: { opacity: 0.75
     }
    ,closeBoxMargin: "10px 2px 2px 2px"
    ,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
    ,infoBoxClearance: new google.maps.Size(1, 1)
    ,isHidden: false
    ,pane: "floatPane"
    ,alignBottom: true
    ,enableEventPropagation: false
      };
    infoBox = new InfoBox(boxOptions);
    var eventDetails = this.eventInfo
    if (eventDetails.isFestival()) {
      var html = HandlebarsTemplates['events/small_festival_info_box'](eventDetails)
    } else {
      var html = HandlebarsTemplates['events/small_event_info_box'](eventDetails)
    }
    infoBox.setContent(html);
    infoBox.open(this.map, this);
 },

   enlargeInfoWindow: function() {
    event.preventDefault()
    console.log("in the large info window")
  }
}

