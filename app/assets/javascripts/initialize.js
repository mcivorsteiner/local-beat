$(document).ready(function(){
  var display = new mapView();
  new mapController(display).init()
  new searchController().init()
})