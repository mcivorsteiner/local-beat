$(document).ready(function(){
  debugger
  var view = new MapView();
  var mapController = new MapController(view)
  var sessionView = new SessionView()
  var sessionController = new SessionController(sessionView)
  var searchController = new SearchController()
  // var userController = new userSessionController()
  var applicationController = new ApplicationController(mapController, sessionController, searchController)

  applicationController.init()

})