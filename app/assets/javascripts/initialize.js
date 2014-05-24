$(document).ready(function(){
  var view = new mapView();
  var mapController = new mapController(view)

  var sessionView = new sessionView()
  var sessionController = new sessionController(seshView)

//create application controller and pass in three controllers
  var searchController = new searchController()
  // var userController = new userSessionController()

})