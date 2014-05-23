function mapView(){
}

mapView.prototype = {

  drawMap: function(){
    var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(-34.397, 150.644)
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }
  }

