$(document).ready(function(){
  var searchView = new SearchView

  applicationController = new ApplicationController(new MapController(new MapView(), searchView),
                                                    new SessionController(new SessionView()),
                                                    new SearchController(searchView)).init();
})