var mapOptions = (function(){
  var defaultCoordinates = {
    lat: 40.689493,
    lng: -98.578265
  }

  var mapStyling = [
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
    {
      "featureType":"road",
      "stylers": [
      {"lightness":20}
      ]
    }];

  var googleMapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(defaultCoordinates.lat, defaultCoordinates.lng),
    panControl: false,
    mapTypeControl: false,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.BOTTOM_CENTER
    },
    streetViewControl: false,
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_BOTTOM
    },
    styles: mapStyling
  }

  return googleMapOptions

})()