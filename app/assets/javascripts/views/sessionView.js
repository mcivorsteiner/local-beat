SessionView = function() {
  this.signInToggleButtonSelector = '#sign-in'
  this.signUpToggleButtonSelector = '#sign-up'
  this.signInFormSelector = '#sign-in-form form'
  this.signUpFormSelector = '#sign-up-form form'
  this.signUpFormDivSelector = '#sign-up-form'
  this.signInFormDivSelector = '#sign-in-form'
  this.currentUserDataSelector = '#current-user-data'
  this.logInMenuSelector = '#log-in-menu-button'
  this.userLogWindowSelector = '#user-log-box'
  this.sessionMenuSelector = '#session-menu'
  this.logOutButtonSelector = '#logout-button'

}

SessionView.prototype = {
  getSignInToggleButton: function() {
    return document.querySelector(this.signInToggleButtonSelector)
  },

  getSignUpToggleButton: function() {
    return document.querySelector(this.signUpToggleButtonSelector)
  },

  toggleSignInForm: function() {
    // var signInForm = document.querySelector(this.signInFormDivSelector)
    // signInForm.classList.toggle('hidden')
    if ($(this.signInFormDivSelector).is(':hidden')){
      $(this.signInFormDivSelector).show("slow");
    } else {
      $(this.signInFormDivSelector).hide(800)
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

  getSignInForm: function() {
    return document.querySelector(this.signInFormSelector)
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