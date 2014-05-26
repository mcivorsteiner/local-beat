SessionView = function() {
  this.loginToggleButtonSelector = '#login'
  this.signUpToggleButtonSelector = '#sign-up'
  this.loginFormSelector = '#login-form form'
  this.signUpFormSelector = '#sign-up-form form'
  this.signUpFormDivSelector = '#sign-up-form'
  this.loginFormDivSelector = '#login-form'
  this.currentUserDataSelector = '#current-user-data'
  this.logInMenuSelector = '#login-menu-button'
  this.userLogWindowSelector = '#user-log-box'
  this.sessionMenuSelector = '#session-menu'
  this.logOutButtonSelector = '#logout-button'

}

SessionView.prototype = {
  getLoginToggleButton: function() {
    return document.querySelector(this.loginToggleButtonSelector)
  },

  getSignUpToggleButton: function() {
    return document.querySelector(this.signUpToggleButtonSelector)
  },

  clearForms: function(){
    $('.pop-up').hide()
  },

  toggleLoginForm: function() {
    // var loginForm = document.querySelector(this.loginFormDivSelector)
    // loginForm.classList.toggle('hidden')
    if ($(this.loginFormDivSelector).is(':hidden')){
      $(this.loginFormDivSelector).show("slow");
    } else {
      $(this.loginFormDivSelector).hide(800)
    }

  },

  toggleSignUpForm: function() {
    // var signUpForm = document.querySelector(this.signUpFormDivSelector)
    // signUpForm.classList.toggle('hidden')
      if ($(this.signUpFormDivSelector).is(':hidden')){
        $(this.signUpFormDivSelector).show("slow");
      } else {
        $(this.signUpFormDivSelector).hide(800)
      }
  },

  toggleSessionBox: function() {
    // var userWindow = document.querySelector(this.userLogWindowSelector)
    if ($(this.userLogWindowSelector).is(':hidden')){
      $(this.userLogWindowSelector).slideDown("slow");
    } else {
      $(this.userLogWindowSelector).slideUp()
    }
    // userWindow.classList.toggle('hidden')
  },

  getLoginForm: function() {
    return document.querySelector(this.loginFormSelector)
  },

  getSignUpForm: function() {
    return document.querySelector(this.signUpFormSelector)
  },


  getCurrentUserData: function() {
    return document.querySelector(this.currentUserDataSelector)
  },


  getLoginMenuButton: function() {
    return document.querySelector(this.logInMenuSelector)
  },

  getUserLogWindow: function() {
    return document.querySelector(this.userLogWindowSelector)
  },

  updateUserData: function(html) {
    var currentUserData = this.getCurrentUserData()
    currentUserData.innerHTML = html
  },

  getSessionMenu: function() {
    return document.querySelector(this.sessionMenuSelector)
  },

  getLogOutButton: function() {
    return document.querySelector(this.logOutButtonSelector)
  }


}