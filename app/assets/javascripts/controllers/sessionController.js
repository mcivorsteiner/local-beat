SessionController = function(view) {
  this.view = view
}

SessionController.prototype = {
  init: function() {
    this.setListeners()
  },

  setListeners: function() {
    var signInToggleButton = this.view.getSignInToggleButton()
    var signUpToggleButton = this.view.getSignUpToggleButton()
    var signInForm = this.view.getSignInForm()
    var signUpForm = this.view.getSignUpForm()
    var loggedOutButton = this.view.getLoggedOutButton()
    var userLogWindow = this.view.getUserLogWindow()
    var sessionMenu = this.view.getSessionMenu()


    signInToggleButton.addEventListener('click', this.toggleSignIn.bind(this), false)
    signUpToggleButton.addEventListener('click', this.toggleSignUp.bind(this), false)

    $(sessionMenu).on('click', '#log-in-menu-button', this.toggleSessionBox.bind(this))
    // loggedOutButton.addEventListener('click', this.toggleSessionBox.bind(this), false)
    // $(signInForm).on('ajax:success', this.signIn.bind(this))
    // $(signUpForm).on('ajax:success', this.signUp.bind(this))
    $(signInForm).on('ajax:error', this.signInError)
    $(signUpForm).on('ajax:error', this.signUpError)


  },

  toggleSignIn: function() {
    this.view.toggleSignInForm()
  },

  toggleSignUp: function() {
    this.view.toggleSignUpForm()
  },

  signIn: function(e, response) {
    userData = JSON.parse(response.userData)
    this.view.updateUserData(response.template)
    this.toggleSignIn()
    this.toggleSessionBox()
  },

  signUp: function(e, response) {
    userData = JSON.parse(response.userData)
    this.view.updateUserData(response.template)
    this.toggleSignUp()
    this.toggleSessionBox()
  },

  signInError: function(e, response, responseType, status) {
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
}