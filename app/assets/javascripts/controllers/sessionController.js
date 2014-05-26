SessionController = function(view) {
  this.view = view
}

SessionController.prototype = {
  init: function() {
    this.setListeners()
  },

  setListeners: function() {
    this.view.getLoginToggleButton().addEventListener('click', this.toggleLogin.bind(this), false)
    this.view.getSignUpToggleButton().addEventListener('click', this.toggleSignUp.bind(this), false)

    $(this.view.getSessionMenu()).on('click', '#login-menu-button', this.toggleSessionBox.bind(this))
    $(this.view.getSessionMenu()).on('click', '#logout-button', this.logOut.bind(this))

    /* Don't you need to bind() these too? */

    $(this.view.getLoginForm()).on('ajax:error', this.loginError)
    $(this.view.getSignUpForm()).on('ajax:error', this.signUpError)
  },

  toggleLogin: function() {
    this.view.clearForms()
    this.view.toggleLoginForm()
  },

  toggleSignUp: function() {
    this.view.clearForms()
    this.view.toggleSignUpForm()
  },

  login: function(e, response) {
    /* This is such an important thing can we set it on applicationController
     * and wrap it in methods....setUserData(response.userData) ?
     */
    userData = JSON.parse(response.userData)
    this.view.updateUserData(response.template)
    this.toggleLogin()
    this.toggleSessionBox()

    var loginMenuButton = this.view.getLoginMenuButton()
    loginMenuButton.src = '/assets/sign-out-icon.png'
    loginMenuButton.id = 'logout-button'
  },

  signUp: function(e, response) {
    userData = JSON.parse(response.userData)
    this.view.updateUserData(response.template)
    this.toggleSignUp()
    this.toggleSessionBox()

    var loginMenuButton = this.view.getLoginMenuButton()
    loginMenuButton.src = '/assets/sign-out-icon.png'
    loginMenuButton.id = 'logout-button'
  },

  loginError: function(e, response, responseType, status) {
    var errorMessages = response.responseJSON.errors
    //WIP Determine how to display error messages to user
  },

  signUpError: function(e, response, responseType, status) {
    var errorMessages = response.responseJSON.errors
    //WIP Determine how to display error messages to user
  },

  toggleSessionBox: function() {
    this.view.clearForms()
    this.view.toggleSessionBox()
  },

  /* Feels like this should be set on the applicationController global */
  logOut: function() {
    var ajaxRequest = $.ajax({
      url: '/session',
      type: 'DELETE'
    })

    ajaxRequest.done(this.logOutSuccess.bind(this))
  },

  /* Feels like this behavior should be passed to
  * applicationController.logout(callback)
  * */

  logOutSuccess: function() {
    logOutButton = this.view.getLogOutButton()
    logOutButton.src = '/assets/login-icon.png'
    logOutButton.id = 'login-menu-button'
    userData = undefined
    this.view.getCurrentUserData().innerText = ""
  }
}
