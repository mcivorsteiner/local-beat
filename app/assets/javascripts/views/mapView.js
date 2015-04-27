function MapView(){
  this.mapSelector          = "map-canvas"
  this.searchWindowSelector = "#search-window"
  this.popupSelector        = ".pop-up"
}

MapView.prototype = {

  drawMap: function(){
    this.map = new google.maps.Map(document.getElementById(this.mapSelector), mapOptions);
  },

  setMap: function(locationCoords){
    var lng = parseFloat(locationCoords.lng)
    var lat = parseFloat(locationCoords.lat)
    var center = new google.maps.LatLng(lat, lng)
    this.map.panTo(center)
    this.map.setZoom(12)
  },

  placeMarkers: function(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(this.map);
    }
    $(document).trigger('markersPlaced')
  },

  clearMarkers: function(markers){
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    $(document).trigger('markersCleared')
  },

  enlargeInfoWindow: function(e) {
    e.preventDefault()
     if ($('.more-event-info').is(':hidden')){
      $('.more-event-info').slideDown("slow");
    } else {
      $('.more-event-info').hide()
    }
  },

  appendLargeInfoBox: function(largeInfoBox){
    $("body").append(largeInfoBox)
  },

  removePopularityBox: function() {
    $('#popularity-box').remove()
  },

  hidePopups: function() {
    $(this.popupSelector).hide()
  }
}

