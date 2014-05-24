sessionView = function() {
  this.signInToggleButtonSelector = '#sign-in'
  this.signUpToggleButtonSelector = '#sign-up'
  this.signInFormSelector = '#sign-in-form form'
  this.signUpFormSelector = '#sign-up-form form'
  this.signUpFormDivSelector = '#sign-up-form'
  this.signInFormDivSelector = '#sign-in-form'
  this.currentUserDataSelector = '#current-user-data'
}

sessionView.prototype = {
  getSignInToggleButton: function() {
    return document.querySelector(this.signInToggleButtonSelector)
  },

  getSignUpToggleButton: function() {
    return document.querySelector(this.signUpToggleButtonSelector)
  },

  toggleSignInForm: function() {
    var signInForm = document.querySelector(this.signInFormDivSelector)
    signInForm.classList.toggle('hidden')
  },

  toggleSignUpForm: function() {
    var signUpForm = document.querySelector(this.signUpFormDivSelector)
    signUpForm.classList.toggle('hidden')
  },

  getSignInForm: function() {
    return document.querySelector(this.signInFormSelector)
  },

  getSignUpForm: function() {
    return document.querySelector(this.signUpFormSelector)
  },

  getCurrentUserData: function() {
    return document.querySelector(this.currentUserDataSelector)
  },

}