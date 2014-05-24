SessionView = function() {
  this.signInToggleButtonSelector = '#sign-in'
  this.signUpToggleButtonSelector = '#sign-up'
  this.signInFormSelector = '#sign-in-form form'
  this.signUpFormSelector = '#sign-up-form form'
  this.signUpFormDivSelector = '#sign-up-form'
  this.signInFormDivSelector = '#sign-in-form'
  this.currentUserDataSelector = '#current-user-data'
  this.sessionBoxSelector = '#user-session'
  this.userLogWindowSelector = '#user-log-box'

}

SessionView.prototype = {
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

  toggleSessionBox: function() {
    var userWindow = document.querySelector(this.userLogWindowSelector)
    userWindow.classList.toggle('hidden')
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


  getSessionBox: function() {
    return document.querySelector(this.sessionBoxSelector)
  },

  getUserLogWindow: function() {
    return document.querySelector(this.userLogWindowSelector)
  },

  updateUserData: function(html) {
    var currentUserData = this.getCurrentUserData()
    currentUserData.innerHTML = html
  },


}