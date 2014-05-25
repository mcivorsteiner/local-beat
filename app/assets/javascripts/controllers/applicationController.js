ApplicationController = function(mapController, sessionController, searchController) {
  this.mapController = mapController
  this.sessionController = sessionController
  this.searchController = searchController
}

ApplicationController.prototype= {
  init: function() {
    this.mapController.init()
    this.sessionController.init()
    this.searchController.init()
    this.setAjaxListeners()
  },

  // setListener:function(){
  //   $('.location-search').on('click', this.setAjaxListeners)
  // },

  setAjaxListeners: function() {
    $('.search').on('ajax:success', this.placeMarkers.bind(this))
    $('.search').on('ajax:error', function(){console.log("we are in the error")})
    // $('form#search').on('ajax:failure', this.mapController.appendErrors)
  },

  placeMarkers:function(event, response){
    this.mapController.placeMarkers(event, response)
  }
}