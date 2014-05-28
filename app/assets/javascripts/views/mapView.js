function MapView(){
  this.mapSelector = "map-canvas"
  this.searchWindowSelector = "#search-window"
}

MapView.prototype = {
  drawMap: function(){
    this.map = new google.maps.Map(document.getElementById(this.mapSelector), mapOptions);
  },

  placeMarkers: function(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(this.map);
    }
  },

  hideSearchBox: function(){ //WIP this should not be in mapview
    // var searchWindow = document.getElementById(this.searchWindowSelector)
    // searchWindow.classList.toggle('hidden')
    $(this.searchWindowSelector).hide(500)
    // $('.advanced-options').hide()
    $('.pop-up').hide()
  },

  clearMarkers: function(markers){
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  },

  setMap: function(locationCoords){
    var lng = parseFloat(locationCoords.lng)
    var lat = parseFloat(locationCoords.lat)
    var center = new google.maps.LatLng(lat, lng)
    this.map.panTo(center)
    this.map.setZoom(12)
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
  }

}

