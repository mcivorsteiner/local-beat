sessionView = function() {
  this.signInToggleButtonSelector = '#sign-in'
  this.signUpToggleButtonSelector = '#sign-up'
  this.signInFormSelector = '#sign-in-form form'
  this.signUpFormSelector = '#sign-up-form form'
  this.signUpFormDiv = '#sign-up-form'
  this.signInFormDiv = '#sign-in-form'
}

sessionView.prototype = {
  getSignInToggleButton: function() {
    return document.querySelector(this.signInToggleButtonSelector)
  },

  getSignUpToggleButton: function() {
    return document.querySelector(this.signUpToggleButtonSelector)
  },

  toggleSignInForm: function() {
    var signInForm = document.querySelector(this.signInFormDiv)
    signInForm.classList.toggle('hidden')
  },

  toggleSignUpForm: function() {
    var signUpForm = document.querySelector(this.signUpFormDiv)
    signUpForm.classList.toggle('hidden')
  },

  getSignInForm: function() {
    return document.querySelector(this.signInFormSelector)
  },

  getSignUpForm: function() {
    return document.querySelector(this.signUpFormSelector)
  },

}