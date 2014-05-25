function MapView(){
}

MapView.prototype = {
  defaults: {
    lat: 40.689493,
    lng: -98.578265,
  },

  drawMap: function(){
    var mapOptions = {
      zoom: 5,
      center: new google.maps.LatLng(this.defaults.lat, this.defaults.lng)
    };
    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  },

  placeMarkers: function(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(this.map);
    }
  },

  setMap: function(locationCoords){
    console.log(locationCoords)
    var lng = parseFloat(locationCoords.lng)
    var lat = parseFloat(locationCoords.lat)

    // var center = new google.maps.LatLng(45, 44)
    var center = new google.maps.LatLng(lat, lng)

    console.log(center)
    this.map.panTo(center)
    this.map.setZoom(12)
  }
}

