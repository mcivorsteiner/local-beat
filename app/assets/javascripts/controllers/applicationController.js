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
    this.getCurrentLocation()
  },

  setAjaxListeners: function() {
    $('.search').on('ajax:success', this.placeMarkers.bind(this))
    $('.search').on('ajax:error', function(){console.log("we are in the error")}) //WIP
    $(this.sessionController.view.getLoginForm()).on('ajax:success', this.login.bind(this))
    $(this.sessionController.view.getSignUpForm()).on('ajax:success', this.signUp.bind(this))
  },

  placeMarkers:function(event, response){
    this.mapController.placeMarkers(event, response)
  },

  login: function(e, response) {
    this.sessionController.login(e, response)
    // This userData global feels kinda dangerous to me....
    var locationCoords = {lat: userData.lat, lng: userData.lng}
    this.mapController.view.setMap(locationCoords)
  },

  signUp: function(e, response) {
    this.sessionController.signUp(e, response)
    // This userData global feels kinda dangerous to me....
    var locationCoords = {lat: userData.lat, lng: userData.lng}
    this.mapController.view.setMap(locationCoords)
  },

  getCurrentLocation: function() {
    /* Look into a library claled Modernizr for testing geolocation support */
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.locationReceived.bind(this))
    }
  },

  locationReceived: function(position) {
    var positionCoords = position.coords
    var coordsObj = {lat: positionCoords.latitude, lng: positionCoords.longitude}

    $.ajax({
      url: '/locations',
      type: 'GET',
      data: coordsObj
    })
    .done(this.setCurrentLocation.bind(this));

    /* or, more simply...^^^^^^^^^*/

  },

  userLoggedIn: function() {
    // This userData global feels kinda dangerous to me....
    return typeof userData != 'undefined'
  },

  setCurrentLocation: function(response) {
    // simpler...
    if (!this.userLoggedIn()) {
      var locationCoords = {lat: response.lat, lng: response.lng}
      this.mapController.view.setMap(locationCoords)
    }
  }

}
