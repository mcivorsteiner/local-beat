function MapView(){
}

MapView.prototype = {
  defaults: {
    lat: 40.689493,
    lng: -98.578265,
  },

  drawMap: function(){
    var image = '/images/marker-icon.png'
    var mapOptions = {
      zoom: 5,
      center: new google.maps.LatLng(this.defaults.lat, this.defaults.lng),
      marker: new google.maps.Marker({icon: image}),
      styles: [
      {
        "featureType":"water",
        "stylers": [
          {"visibility":"on"},
          {"color":"#b5cbe4"}
          ]},
      {
        "featureType":"landscape",
        "stylers": [
          {"color":"#efefef"}
          ]},
      {
        "featureType":"road.highway",
        "elementType":"geometry",
        "stylers": [
          {"color":"#83a5b0"}
          ]},
      {
        "featureType":"road.arterial",
        "elementType":"geometry",
        "stylers": [
        {"color":"#bdcdd3"}
        ]},
      {
        "featureType":"road.local",
        "elementType":"geometry",
        "stylers": [
          {"color":"#ffffff"}
          ]},
      {
        "featureType":"poi.park",
        "elementType":"geometry",
        "stylers": [
        {"color":"#e3eed3"}
        ]},
      {
        "featureType":"administrative",
        "stylers": [
        {"visibility":"on"},
        {"lightness":33}
        ]},
      {
        "featureType":"road"
      },
      {
        "featureType":"poi.park",
        "elementType":"labels",
        "stylers": [
        {"visibility":"on"},
        {"lightness":20}
        ]},
      {},
      {
        "featureType":"road",
        "stylers": [
        {"lightness":20}
        ]}
      ]
    };
    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  },

  placeMarkers: function(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(this.map);
    }
  },

  setMap: function(locationCoords){
    var lng = parseFloat(locationCoords.lng)
    var lat = parseFloat(locationCoords.lat)
    var center = new google.maps.LatLng(lat, lng)
    this.map.panTo(center)
    this.map.setZoom(12)
    // var image = '/images/marker-icon.png'
    // var marker = new google.maps.Marker({icon: image})

  }
}

