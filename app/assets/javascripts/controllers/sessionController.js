SessionController = function(view) {
  this.view = view
}

SessionController.prototype = {
  init: function() {
    this.setListeners()
  },

  setListeners: function() {
    var loginToggleButton = this.view.getLoginToggleButton()
    var signUpToggleButton = this.view.getSignUpToggleButton()
    var loginForm = this.view.getLoginForm()
    var signUpForm = this.view.getSignUpForm()
    var userLogWindow = this.view.getUserLogWindow()
    var sessionMenu = this.view.getSessionMenu()


    loginToggleButton.addEventListener('click', this.toggleLogin.bind(this), false)
    signUpToggleButton.addEventListener('click', this.toggleSignUp.bind(this), false)

    $(sessionMenu).on('click', '#login-menu-button', this.toggleSessionBox.bind(this))
    $(sessionMenu).on('click', '#logout-button', this.logOut.bind(this))

    $(loginForm).on('ajax:error', this.loginError)
    $(signUpForm).on('ajax:error', this.signUpError)


  },

  toggleLogin: function() {
    this.view.toggleLoginForm()
  },

  toggleSignUp: function() {
    this.view.toggleSignUpForm()
  },

  login: function(e, response) {
    userData = JSON.parse(response.userData)
    this.view.updateUserData(response.template)
    this.toggleLogin()
    this.toggleSessionBox()

    var loginMenuButton = this.view.getLoginMenuButton()
    loginMenuButton.src = '/assets/sign-out-icon.png'
    loginMenuButton.id = 'logout-button'
  },

  signUp: function(e, response) {
    userData = JSON.parse(response.userData)
    this.view.updateUserData(response.template)
    this.toggleSignUp()
    this.toggleSessionBox()

    var loginMenuButton = this.view.getLoginMenuButton()
    loginMenuButton.src = '/assets/sign-out-icon.png'
    loginMenuButton.id = 'logout-button'
  },

  loginError: function(e, response, responseType, status) {
    var errorMessages = response.responseJSON.errors
    //Determine how to display error messages to user
  },

  signUpError: function(e, response, responseType, status) {
    var errorMessages = response.responseJSON.errors
    //Determine how to display error messages to user
  },

  toggleSessionBox: function() {
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
    userData = undefined
    this.view.getCurrentUserData().innerText = ""
  }
}