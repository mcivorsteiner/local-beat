function mapView(){
}

mapView.prototype = {

  drawMap: function(){
    var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(40.689493, -98.578265)
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }
  }

