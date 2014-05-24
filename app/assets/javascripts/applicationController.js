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

  setAjaxListeners: function() {
    $('.location-search').on('ajax:success', this.mapController.placeMarkers)
    $('form#search').on('ajax:failure', this.mapController.appendErrors)
  }
}
