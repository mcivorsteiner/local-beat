$(document).ready(function(){
  var display = new mapView();
  new mapController(display).init()



  var seshView = new sessionView()
  var seshController = new sessionController(seshView)

  seshController.init()

  new searchController().init()
  new userSessionController().init()

})