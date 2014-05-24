$(document).ready(function(){
  var view = new mapView();
  new mapController(view).init()

  var seshView = new sessionView()
  var seshController = new sessionController(seshView)
  seshController.init()

  new searchController().init()
  new userSessionController().init()

})