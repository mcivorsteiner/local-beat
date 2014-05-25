function MapView(){
}

MapView.prototype = {
  defaults: {
    lng: 40.689493,
    lat: -98.578265,
  },

  drawMap: function(){
    var mapOptions = {
      zoom: 5,
      center: new google.maps.LatLng(this.defaults.lng, this.defaults.lat)
    };
    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  },

  placeMarkers: function(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(this.map);
    }
  },

   hideSearchBox: function(){
    var searchWindow = document.getElementById('searchWindow')
    searchWindow.classList.toggle('hidden')
  },

  clearMarkers: function(markers){
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }
}

