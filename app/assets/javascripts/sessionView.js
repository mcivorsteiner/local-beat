SessionView = function() {
  this.signInToggleButtonSelector = '#sign-in'
  this.signUpToggleButtonSelector = '#sign-up'
  this.signInFormSelector = '#sign-in-form form'
  this.signUpFormSelector = '#sign-up-form form'
  this.signUpFormDiv = '#sign-up-form'
  this.signInFormDiv = '#sign-in-form'
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
    var signInForm = document.querySelector(this.signInFormDiv)
    debugger
    signInForm.classList.toggle('hidden')
  },

  toggleSignUpForm: function() {
    var signUpForm = document.querySelector(this.signUpFormDiv)
    signUpForm.classList.toggle('hidden')
  },

  toggleSessionBox: function() {
    var userWindow = document.querySelector(this.userLogWindowSelector)
    userWindow.classList.toggle('hidden')
  },

  getSignInForm: function() {
    console.log(document.querySelector(this.signInFormSelector))


    return document.querySelector(this.signInFormSelector)
  },

  getSignUpForm: function() {
    console.log(document.querySelector(this.signUpFormSelector))

    return document.querySelector(this.signUpFormSelector)
  },

  getSessionBox: function() {
    return document.querySelector(this.sessionBoxSelector)
  },

  getUserLogWindow: function() {
    return document.querySelector(this.userLogWindowSelector)
  }

}