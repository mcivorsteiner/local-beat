SessionController = function(view) {
  this.view = view
}

SessionController.prototype = {
  init: function() {
    this.setListeners()
  },

  setListeners: function() {
    this.view.getLoginToggleButton().addEventListener('click', this.toggleLogin.bind(this), false)
    this.view.getSignUpToggleButton().addEventListener('click', this.toggleSignUp.bind(this), false)
    this.view.getSettingsButton().addEventListener('click', this.toggleUpdateLocationDiv.bind(this), false)
    $(this.view.getSessionMenu()).on('click', '#login-menu-button', this.toggleSessionBox.bind(this))
    $(this.view.getSessionMenu()).on('click', '#logout-button', this.logOut.bind(this))

    $(this.view.getLoginForm()).on('ajax:error', this.loginError.bind(this))
    $(this.view.getSignUpForm()).on('ajax:error', this.signUpError.bind(this))

  },

  toggleLogin: function() {
    this.view.clearForms()
    this.view.toggleLoginForm()
  },

  toggleSignUp: function() {
    this.view.clearForms()
    this.view.toggleSignUpForm()
  },

  toggleUpdateLocationDiv: function() {
    // this.view.clearForms()
    this.view.toggleUpdateLocationDiv()
  },

  login: function(e, response) {
    userData = JSON.parse(response.userData)
    this.view.updateUserData(response.template)
    this.toggleLogin()
    this.toggleSessionBox()
    this.view.clearForms()

    var loginMenuButton = this.view.getLoginMenuButton()
    loginMenuButton.src = '/assets/sign-out-icon.png'
    loginMenuButton.id = 'logout-button'

    this.view.toggleSettingsButton()
  },

  signUp: function(e, response) {
    userData = JSON.parse(response.userData)
    this.view.updateUserData(response.template)
    this.toggleSignUp()
    this.toggleSessionBox()
    this.view.clearForms()

    var loginMenuButton = this.view.getLoginMenuButton()
    loginMenuButton.src = '/assets/sign-out-icon.png'
    loginMenuButton.id = 'logout-button'
    this.view.clearForms()
    this.view.toggleSettingsButton()
  },

  loginError: function(e, response, responseType, status) {
    var errorMessages = response.responseJSON.errors
    this.view.renderLoginErrorMessages(errorMessages[0])
  },

  signUpError: function(e, response, responseType, status) {
    var errorMessages = response.responseJSON.errors
    this.view.renderSignUpErrorMessages(errorMessages[0])
  },

  toggleSessionBox: function() {
    // this.view.clearForms()
    this.view.toggleSessionBox()
  },

  logOut: function() {
    var ajaxRequest = $.ajax({
      url: '/session',
      type: 'DELETE'
    })

    ajaxRequest.done(this.logOutSuccess.bind(this))
  },

  logOutSuccess: function() {
    logOutButton = this.view.getLogOutButton()
    logOutButton.src = '/assets/login-icon.png'
    logOutButton.id = 'login-menu-button'
    this.view.clearForms()
    this.view.toggleSettingsButton()
    userData = undefined
    this.view.getCurrentUserData().innerText = ""
  }
}