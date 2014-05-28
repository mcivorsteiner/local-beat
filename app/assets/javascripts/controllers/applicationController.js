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
    // $(document).on('click', this.getSpotifyPlayer.bind(this))
    if (!this.userLoggedIn()) {
      this.getCurrentLocation()
    } else {
      this.getEventsForUserLocationPreference()
    }
  },

  setAjaxListeners: function() {
    $('.search').on('ajax:success', this.placeMarkers.bind(this))
    $('.search').on('ajax:error', this.searchController.renderErrorMessages.bind(this.searchController)) //WIP
    $(this.sessionController.view.getLoginForm()).on('ajax:success', this.login.bind(this))
    $(this.sessionController.view.getSignUpForm()).on('ajax:success', this.signUp.bind(this))
  },

  placeMarkers:function(event, response){
    this.mapController.placeMarkers(event, response)
  },

  login: function(e, response) {
    this.sessionController.login(e, response)
    var locationCoords = {lat: userData.lat, lng: userData.lng}
    var placeMarkersEvents = {events: response.events, location_coords: locationCoords, location_name: userData.songkickLocationName }
    this.mapController.placeMarkers(null, placeMarkersEvents)
  },

  signUp: function(e, response) {
    this.sessionController.signUp(e, response)
    var locationCoords = {lat: userData.lat, lng: userData.lng}
    var eventData = {events: response.events, location_coords: locationCoords, location_name: userData.songkickLocationName}
    this.mapController.placeMarkers(null, eventData)
  },

  getCurrentLocation: function() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.locationReceived.bind(this))
    }
  },

  locationReceived: function(position) {
    var positionCoords = position.coords
    var coordsObj = {lat: positionCoords.latitude, lng: positionCoords.longitude}

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
    if (!this.userLoggedIn()) {
      this.mapController.placeMarkers(null,response)
    }
  },

  getEventsForUserLocationPreference: function() {
    var songkickLocationId = userData.songkickLocationId

    var ajaxRequest = $.ajax({
        url: '/events/sk_location_id',
        type: 'GET',
        data: {songkickLocationId: songkickLocationId}
    })

    ajaxRequest.done(this.placeEventsForUserLocationPreference.bind(this))
  },

  placeEventsForUserLocationPreference: function(response) {
    var eventData = {events: response, location_coords: {lat: userData.lat, lng: userData.lng}, location_name: userData.songkickLocationName}
    this.mapController.placeMarkers(null,eventData)
  }
}
