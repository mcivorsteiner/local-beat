sessionView = function() {
  this.view = view
  this.signInToggleButtonSelector = '#sign-in'
  this.signUpToggleButtonSelector = '#sign-up'
  this.signInFormSelector = "#sign-in-form form"
  this.signUpFormSelector = "#sign-in-form form"
}

sessionController.prototype = {
  getSignInToggleButton: function() {
    return document.getElementById(this.signInToggleButtonSelector)
  },

  getSignUpToggleButton: function() {
    return document.getElementById(this.signUpToggleButtonSelector)
  },

  toggleSignInForm: function() {
    var signInForm = document.querySelector(this.signInFormSelector)
    signInForm.classList.toggle('hidden')
  },

  toggleSignUpForm: function() {
    var signUpForm = document.querySelector(this.signUpFormSelector)
    signUpForm.classList.toggle('hidden')
  },

  getSignInForm: function() {
    return document.querySelector(this.signInFormSelector)
  },

  getSignUpForm: function() {
    return document.querySelector(this.signUpFormSelector)
  },

}