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

  // setListener:function(){
  //   $('.location-search').on('click', this.setAjaxListeners)
  // },

  setAjaxListeners: function() {
    $('.search').on('ajax:success', this.placeMarkers.bind(this))
    $('.search').on('ajax:error', function(){console.log("we are in the error")})

    $(this.sessionController.view.getSignInForm()).on('ajax:success', this.signIn.bind(this))
    $(this.sessionController.view.getSignUpForm()).on('ajax:success', this.signUp.bind(this))

    // $('form#search').on('ajax:failure', this.mapController.appendErrors)
  },

  placeMarkers:function(event, response){
    this.mapController.placeMarkers(event, response)
  },

  signIn: function(e, response) {
    this.sessionController.signIn(e, response)
    var locationCoords = {lat: userData.lat, lng: userData.lng}
    this.mapController.view.setMap(locationCoords)
  },

  signUp: function(e, response) {
    this.sessionController.signUp(e, response)
    var locationCoords = {lat: userData.lat, lng: userData.lng}
    this.mapController.view.setMap(locationCoords)
  },

  getCurrentLocation: function() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.locationReceived.bind(this))
    }
  },

  locationReceived: function(position) {
    var positionCoords = position.coords
    var coordsObj = {lat: positionCoords.latitude, lng: positionCoords.longitude}

    console.log(this)

    var ajaxRequest = $.ajax({
      url: '/locations',
      type: 'GET',
      data: coordsObj
    })

    ajaxRequest.done(this.setCurrentLocation.bind(this))

  },

  userLoggedIn: function() {
    return typeof userData != 'undefined'
  },

  setCurrentLocation: function(response) {
    if (this.userLoggedIn()) {
    } else {
      var locationCoords = {lat: response.lat, lng: response.lng}
      this.mapController.view.setMap(locationCoords)
    }
  }

}
