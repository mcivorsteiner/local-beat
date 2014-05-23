function mapView(){
}

mapView.prototype = {

  drawMap: function(){
    var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(41.850033, -87.6500523)
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    }
  }

