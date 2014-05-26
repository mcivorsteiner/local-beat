$(document).ready(function(){
  /* consider INLINE TEMP VARIABLE */
  applicationController = new ApplicationController(new MapController(new MapView()),
                                                    new SessionController(new SessionView()),
                                                    new SearchController(new SearchView)).init();
})
