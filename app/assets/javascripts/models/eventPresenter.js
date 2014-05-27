function EventPresenter(){
}

EventPresenter.prototype = {
  createMarkers: function(eventData){
    markers = []
    for (var i = 0; i < eventData.length; i++) {
      var latLng = new google.maps.LatLng(eventData[i].location[0], eventData[i].location[1]);
      var image = '/assets/new-marker-icon.png'
      var markerPic = new google.maps.MarkerImage(image)
      var marker = new google.maps.Marker({ position: latLng,map: this.map, icon: markerPic });
      var eventObject = new Event(eventData[i])
      marker.eventInfo = eventObject
      markers.push(marker)
    }
    return markers
  }
}


