function searchController() {

}

searchController.prototype = {
  init: function() {
    this.setListeners()
  },
  setListeners: function() {
    var searchIcon = document.getElementById('magnify')
    searchIcon.addEventListener('click', this.renderSearchBar())
  },
  renderSearchBar: function(event) {
    var searchWindow = document.getElementById('searchWindow')
    searchWindow.style.display = 'block'
    console.log('hello')
    //toggle the search bar partial
  }
}