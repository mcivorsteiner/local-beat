sessionController = function(view) {
  this.view = view
}

sessionController.prototype = {
  setListeners: function() {
    var signInToggleButton = this.view.getSignInToggleButton()
    var signUpToggleButton = this.view.getSignUpToggleButton()
    var singInForm = this.view.getSignInForm()

    signInToggleButton.addEventListener('click', this.toggleSignIn, false)
    signUpToggleButton.addEventListener('click', this.toggleSignUp, false)
  },

  toggleSignIn: function() {
    this.view.toggleSignInForm()
  },

  toggleSignUp: function() {
    this.view.toggleSignUpForm()
  },
}