
function eventPresenter(){
  this.markers = []
}


eventPresenter.prototype ={
  createMarkers: function(eventData){
      for (var i = 0; i < eventData.length; i++) {
        var latLng = new google.maps.LatLng(eventData[i].location[0], eventData[i].location[1]);
        var marker = new google.maps.Marker({ position: latLng });
        var eventObject = new Event(eventData[i])
        marker.eventInfo = eventData[i]
        this.markers.push(marker)
        return this.markers
        // google.maps.event.addListener(marker, 'click', this.showInfoWindow)
      }
    }
  }
