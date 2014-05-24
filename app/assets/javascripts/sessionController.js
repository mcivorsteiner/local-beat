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
    var sessionBox = this.view.getSessionBox()
    var userLogWindow = this.view.getUserLogWindow()

    signInToggleButton.addEventListener('click', this.toggleSignIn.bind(this), false)
    signUpToggleButton.addEventListener('click', this.toggleSignUp.bind(this), false)
    sessionBox.addEventListener('click', this.renderSessionBox.bind(this), false)
    $(signInForm).on('ajax:success', this.signIn)
    $(signUpForm).on('ajax:success', this.signUp)
    $(signInForm).on('ajax:error', this.signInError)

  },

  toggleSignIn: function() {
    this.view.toggleSignInForm()
  },

  toggleSignUp: function() {
    this.view.toggleSignUpForm()
  },

  signIn: function(e, response) {
    debugger
  },

  signUp: function(e, response) {
    debugger
  },

  signInError: function(e, response, responseType, status) {
    var errorMessage = response.responseJSON.error

  renderSessionBox: function() {
    this.view.toggleSessionBox()
  }
}