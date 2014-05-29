ApplicationController = function(mapController, sessionController, searchController) {
  this.mapController = mapController
  this.sessionController = sessionController
  this.searchController = searchController
  this.spinner = new Spinner()
}

ApplicationController.prototype= {
  init: function() {
    this.mapController.init()
    this.sessionController.init()
    this.searchController.init()
    this.setAjaxListeners()
    if (!this._userLoggedIn()) {
      this.getCurrentLocation()
    } else {
      this.getEventsForUserLocationPreference()
    }
  },

  setAjaxListeners: function() {
    $('.search').on('ajax:success', this.placeMarkers.bind(this))
    $('.search').on('ajax:error', this.searchController.renderErrorMessages.bind(this.searchController))
    $(this.sessionController.view.getLoginForm()).on('ajax:success', this.login.bind(this))
    $(this.sessionController.view.getSignUpForm()).on('ajax:success', this.signUp.bind(this))
    $(this.sessionController.view.getUpdateLocationDiv()).on('submit', this.updateUserPreferences.bind(this))
  },


  // MAPS RELATED

  placeMarkers:function(event, response){
    this.mapController.placeMarkers(event, response)
    this.searchController.view.hideSearchBox()
  },


  // SESSION RELATED

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


  // GEOLOCATION

  getCurrentLocation: function() {
    if(navigator.geolocation) {
      this.spinner.spin()
      $('body').append(this.spinner.el)
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
    ajaxRequest.fail(this.locationNotFound.bind(this))
  },

  setCurrentLocation: function(response) {
    this.spinner.stop()
    if (!this._userLoggedIn()) {
      this.mapController.placeMarkers(null,response)
    }
  },

  locationNotFound: function() {
    this.spinner.stop()
  },


  // LOGGED IN USER INITIALIZATION PROCESS

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
  },


  // UPDATE USER PREFERENCES

  updateUserPreferences: function(e) {
    e.preventDefault()
    var form = e.target

    var ajaxRequest = $.ajax({
      url: '/users',
      type: 'PUT',
      data: $(form).serialize()
    })

    ajaxRequest.done(this.applyUserPreferenceUpdates.bind(this))
    ajaxRequest.fail(this.userPreferenceUpdatesError.bind(this))
  },

  applyUserPreferenceUpdates: function(response) {
    userData = JSON.parse(response.userData)
    var locationCoords = {lat: userData.lat, lng: userData.lng}
    var eventData = {events: response.events, location_coords: locationCoords }
    this.mapController.placeMarkers(null, eventData)
  },

  userPreferenceUpdatesError: function(response) {
  },


  // HELPER METHODS

  _userLoggedIn: function() {
    return typeof userData != 'undefined'
  },

}
