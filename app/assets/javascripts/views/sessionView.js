SessionView = function() {
  this.loginToggleButtonSelector = '#login'
  this.signUpToggleButtonSelector = '#sign-up'
  this.loginFormSelector = '#login-form form'
  this.signUpFormSelector = '#sign-up-form form'
  this.signUpFormDivSelector = '#sign-up-form'
  this.loginFormDivSelector = '#login-form'
  this.currentUserDataSelector = '#current-user-data'
  this.logInMenuSelector = '#login-menu-button'
  this.userLogWindowSelector = '#user-log-box'
  this.sessionMenuSelector = '#session-menu'
  this.logOutButtonSelector = '#logout-button'
  this.signUpErrorDivSelector = '.sign-up-errors h4'
  this.loginErrorDivSelector = '.login-errors h4'
  this.settingsButtonSelector = '.settings-button'
  this.updateLocationDivSelector = '#update-user-preferences'
}

SessionView.prototype = {
  
  updateUserData: function(html) {
    var currentUserData = this.getCurrentUserData()
    currentUserData.innerHTML = html
  },

  clearForms: function(){
    $('.pop-up').hide()
  },


  // TOGGLE FORMS

  toggleLoginForm: function() {
    if ($(this.loginFormDivSelector).is(':hidden')){
      $(this.loginFormDivSelector).show("slow");
    } else {
      $(this.loginFormDivSelector).hide(800)
    }
  },

  toggleSignUpForm: function() {
    if ($(this.signUpFormDivSelector).is(':hidden')){
      $(this.signUpFormDivSelector).show("slow");
    } else {
      $(this.signUpFormDivSelector).hide(800)
    }
  },

  toggleSessionBox: function() {
    if ($(this.userLogWindowSelector).is(':hidden')){
      $('.pop-up').hide()
      $(this.userLogWindowSelector).slideDown("fast")
    } else {
      $(this.userLogWindowSelector).hide()
    }
  },

  toggleSettingsButton: function(){
    $('#location').val('')
    this.getSettingsButton().classList.toggle("hidden")
  },

  toggleUpdateLocationDiv: function(){
    var updateForm = this.getUpdateLocationDiv()
    var currentLocation = userData.songkickLocationName
    $('span.current-location').text(currentLocation)
    if ($(updateForm).is(':hidden')){
      $('.pop-up').hide()
      $(updateForm).slideDown("fast")
    } else {
      $(updateForm).hide()
    }
  },


  // ERROR MESSAGES

  renderLoginErrorMessages: function(errors){
    document.querySelector(this.loginErrorDivSelector).innerText = errors
  },

  renderSignUpErrorMessages: function(errors){
    document.querySelector(this.signUpErrorDivSelector).innerText = errors
  },


  // GET DOM ELEMENT METHODS

  getLoginForm: function() {
    return document.querySelector(this.loginFormSelector)
  },

  getSignUpForm: function() {
    return document.querySelector(this.signUpFormSelector)
  },

  getCurrentUserData: function() {
    return document.querySelector(this.currentUserDataSelector)
  },

  getLoginMenuButton: function() {
    return document.querySelector(this.logInMenuSelector)
  },

  getUserLogWindow: function() {
    return document.querySelector(this.userLogWindowSelector)
  },

  getSessionMenu: function() {
    return document.querySelector(this.sessionMenuSelector)
  },

  getLogOutButton: function() {
    return document.querySelector(this.logOutButtonSelector)
  },

  getSettingsButton: function() {
    return document.querySelector(this.settingsButtonSelector)
  },

  getUpdateLocationDiv: function(){
    return document.querySelector(this.updateLocationDivSelector)
  },

  getLoginToggleButton: function() {
    return document.querySelector(this.loginToggleButtonSelector)
  },

  getSignUpToggleButton: function() {
    return document.querySelector(this.signUpToggleButtonSelector)
  }
}
