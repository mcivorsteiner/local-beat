
function EventPresenter(){
  this.markers = []
}


EventPresenter.prototype = {
  createMarkers: function(eventData){
      for (var i = 0; i < eventData.length; i++) {
        var latLng = new google.maps.LatLng(eventData[i].location[0], eventData[i].location[1]);
        var image = '/assets/marker-icon.png'
        var markerPic = new google.maps.MarkerImage(image)
        var marker = new google.maps.Marker({ position: latLng,map: this.map, icon: markerPic });
        var eventObject = new Event(eventData[i])
        marker.eventInfo = eventObject
        this.markers.push(marker)
        // google.maps.event.addListener(marker, 'click', this.showInfoWindow)
      }
      return this.markers
    }
  }


