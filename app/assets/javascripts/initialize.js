$(document).ready(function(){

  var view = new MapView();
  var mapController = new MapController(view)
  var sessionView = new SessionView()
  var sessionController = new SessionController(sessionView)
  var searchView = new SearchView
  var searchController = new SearchController(searchView)
  var applicationController = new ApplicationController(mapController, sessionController, searchController)
  applicationController.init()

})