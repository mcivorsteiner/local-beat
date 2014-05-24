$(document).ready(function(){
  var view = new mapView();
  new mapController(view).init()
  new searchController().init()
  new userSessionController().init()
})