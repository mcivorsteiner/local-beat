$(document).ready(function(){
  
  applicationController = new ApplicationController(new MapController(new MapView()),
                                                    new SessionController(new SessionView()),
                                                    new SearchController(new SearchView())).init();
})