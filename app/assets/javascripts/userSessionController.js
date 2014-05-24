function userSessionController() {
  this.userSessionBox = document.getElementById('user-session')

}

userSessionController.prototype = {
  init: function() {
    this.setListeners()
  },

  setListeners: function() {
    // add listeners for sign in/sign up pop-up window?
    this.userSessionBox.addEventListener('click', this.renderSessionBox)
  },

  renderSessionBox: function(event) {
    event.preventDefault();
    console.log('we are here')
    var userLogWindow = document.getElementById('user-log-box')
    userLogWindow.classList.toggle('hidden')
  }

}