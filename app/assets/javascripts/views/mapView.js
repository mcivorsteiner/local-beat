function MapView(){
}

MapView.prototype = {
  drawMap: function(){
    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  },

  placeMarkers: function(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(this.map);
    }
  },

  hideSearchBox: function(){
    // var searchWindow = document.getElementById('searchWindow')
    // searchWindow.classList.toggle('hidden')
    $('#searchWindow').hide(500)
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
  }
}

